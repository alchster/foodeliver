package db

import (
	"errors"
	"fmt"
	"github.com/jinzhu/gorm"
	"github.com/shopspring/decimal"
	"golang.org/x/crypto/bcrypt"
	"log"
	"math/rand"
	"time"
)

type Supplier struct {
	LoginUser
	ITN        string             `json:"itn"`
	Phone      string             `json:"phone"`
	Address    string             `json:"address"`
	Status     SupplierStatus     `json:"status" gorm:"foreignkey:StatusCode; association_foreignkey:Code"`
	StatusCode SupplierStatusCode `json:"status_code" sql:"type:smallint REFERENCES supplier_statuses(code)"`
	StatusText string             `json:"status_text"`
}

type SupplierStation struct {
	SupplierID   UUID            `gorm:"foreignkey:Supplier; association_foreignkey:ID"`
	StationID    UUID            `gorm:"foreignkey:Station; association_foreignkey:ID"`
	MinAmount    decimal.Decimal `gorm:"type:numeric"`
	DeliveryTime time.Duration   `gorm:"notnull"`
}

func (s *Supplier) BeforeSave() error {
	if s.Login == "" || s.Password == "" {
		return errors.New("Neither login nor password can be empty")
	}
	if cost, err := bcrypt.Cost([]byte(s.Password)); err != nil || cost == 0 {
		s.Password = PasswordStr(cryptPassword(string(s.Password)))
	}
	return nil
}

func (s *Supplier) AfterSave() error {
	db.Joins("JOIN texts on text_id = texts.id").Preload("Status").Find(&s.Status, "code = ?", s.StatusCode)
	return nil
}

func (s *Supplier) AfterFind() error {
	db.Joins("JOIN texts on text_id = texts.id").Preload("Status").Find(&s.Status, "code = ?", s.StatusCode)
	return nil
}

func (s *Supplier) BeforeCreate() error {
	s.ID = NewID()
	return nil
}

func (s *Supplier) BeforeDelete(tx *gorm.DB) error {
	login := "deleted__" + s.Login + "__" + s.ID.String()
	return tx.Model(&Supplier{}).Where("id = ?", s.ID).UpdateColumn("login", login).Error
}

type SupplierListItem struct {
	Supplier Supplier  `json:"supplier"`
	Stations []Station `json:"stations"`
	Products []Product `json:"products"`
}

func SuppliersList() ([]SupplierListItem, error) {
	if startTime.IsZero() {
		return nil, errors.New("Start time not set")
	}
	var suppliers []Supplier
	if err := db.Where("status_code = ?", SUPPLIER_STATUS_ACTIVE).Find(&suppliers).Error; err != nil {
		return nil, err
	}
	res := make([]SupplierListItem, 0)
	for _, s := range suppliers {
		var ss []SupplierStation
		if err := db.Where("supplier_id = ?", s.ID).Find(&ss).Error; err != nil {
			return nil, err
		}

		var pr []Product
		if err := db.Limit(5).Where("supplier_id = ? and status_code = ?",
			s.ID, PRODUCT_STATUS_APPROVED).Find(&pr).Error; err != nil {
			return nil, err
		}

		sts := make([]Station, 0)
		for _, st := range ss {
			var station Station
			var sli StationsListItem
			var period time.Duration
			if idx, ok := stationsMap[st.StationID]; ok {
				db.Where("id = ?", stations[idx].ID).First(&station)
				if !station.Active {
					continue
				}
				log.Print(station)
				sli = stationsList[idx]
				if sli.RelativeDeparture-sli.RelativeArrival > 5*time.Minute {
					period = 5*time.Minute + st.DeliveryTime +
						time.Duration(service.MinutesForPayment)*time.Minute
					station.OrderDeadline = sli.Departure.Add(-period)
				} else {
					period = st.DeliveryTime + time.Duration(service.MinutesForPayment)*time.Minute
					station.OrderDeadline = sli.Arrival.Add(-period)
				}
				now := time.Now()
				if now.Sub(station.OrderDeadline) < 0 {
					station.OrderAvailable = true
				}
				station.MinAmount = st.MinAmount
				sts = append(sts, station)
			}
		}
		if len(sts) > 0 {
			res = append(res, SupplierListItem{
				Supplier: s,
				Stations: sts,
				Products: pr,
			})
		}
	}

	return res, nil
}

type SupplierStationResp struct {
	ID           UUID            `json:"id"`
	OrderEndTime TimeResp        `json:"order_end_time"`
	MinAmount    decimal.Decimal `json:"min_amount"`
}

type SupplierProductResp struct {
	ID          UUID            `json:"id"`
	Image       string          `json:"image"`
	Cost        decimal.Decimal `json:"cost"`
	Name        Text            `json:"name"`
	Description Text            `json:"description"`
}

type SupplierResponseBase struct {
	ID          UUID   `json:"id"`
	Description string `json:"description"`
	Logo        string `json:"logo"`
}

type SupplierResponseItem struct {
	SupplierResponseBase
	Products []SupplierProductResp `json:"products"`
	Stations []SupplierStationResp `json:"stations"`
}

func SuppliersOnPath() ([]SupplierResponseItem, error) {
	sl, err := SuppliersList()
	if err != nil {
		return nil, err
	}
	res := make([]SupplierResponseItem, len(sl))
	for idx, sli := range sl {
		st := make([]SupplierStationResp, len(sli.Stations))
		for i, s := range sli.Stations {
			st[i] = SupplierStationResp{
				ID:           s.ID,
				MinAmount:    s.MinAmount,
				OrderEndTime: TimeResp(s.OrderDeadline),
			}
		}
		pr := make([]SupplierProductResp, len(sli.Products))
		for i, p := range sli.Products {
			pr[i] = SupplierProductResp{
				ID:          p.ID,
				Image:       fmt.Sprintf("/pic/food/food-%d.png", rand.Int()%32+1),
				Name:        p.Name,
				Description: p.Description,
				Cost:        p.Cost,
			}
		}
		res[idx] = SupplierResponseItem{
			SupplierResponseBase: SupplierResponseBase{
				ID:          sli.Supplier.ID,
				Logo:        "/pic/new/n1.jpg",
				Description: sli.Supplier.Description,
			},
			Products: pr,
			Stations: st,
		}
	}
	return res, nil
}

type CategoryProductsItem struct {
	ID       UUID                  `json:"id"`
	Category Text                  `json:"category"`
	Products []SupplierProductResp `json:"products"`
}

type SupplierCategoriesItem struct {
	SupplierResponseBase
	Categories []CategoryProductsItem `json:"categories"`
	Stations   []SupplierStationResp  `json:"stations"`
}

func SupplierProducts(suppId string) (*SupplierCategoriesItem, error) {
	if startTime.IsZero() {
		return nil, errors.New("Start time not set")
	}
	id, err := GetUUID(suppId)
	if err != nil {
		return nil, err
	}
	var s Supplier
	if err := db.Where("id = ? and status_code = ?", id, SUPPLIER_STATUS_ACTIVE).
		Find(&s).Error; err != nil {
		return nil, err
	}
	var pr []Product
	if err := db.Where("supplier_id = ? and status_code = ?",
		s.ID, PRODUCT_STATUS_APPROVED).Find(&pr).Error; err != nil {
		return nil, err
	}
	catmap := make(map[UUID]CategoryProductsItem)
	for _, p := range pr {
		if c, ok := catmap[p.CategoryID]; ok {
			c.Products = append(c.Products, SupplierProductResp{
				ID:          p.ID,
				Image:       fmt.Sprintf("/pic/food/food-%d.png", rand.Int()%32+1),
				Name:        p.Name,
				Description: p.Description,
				Cost:        p.Cost,
			})
		} else {
			catmap[p.CategoryID] = CategoryProductsItem{
				ID:       p.CategoryID,
				Category: p.Category,
				Products: []SupplierProductResp{
					{
						ID:          p.ID,
						Image:       fmt.Sprintf("/pic/food/food-%d.png", rand.Int()%32+1),
						Name:        p.Name,
						Description: p.Description,
						Cost:        p.Cost,
					},
				},
			}
		}
	}
	var cat []CategoryProductsItem
	for _, cpi := range catmap {
		cat = append(cat, cpi)
	}
	var supstat []SupplierStation
	db.Where("supplier_id = ?", s.ID).Find(&supstat)
	stations := make([]SupplierStationResp, 0)
	for _, st := range supstat {
		if idx, ok := stationsMap[st.StationID]; ok {
			sli := stationsList[idx]
			var period time.Duration
			var od time.Time
			if sli.RelativeDeparture-sli.RelativeArrival > 5*time.Minute {
				period = 5*time.Minute + st.DeliveryTime +
					time.Duration(service.MinutesForPayment)*time.Minute
				od = sli.Departure.Add(-period)
			} else {
				period = st.DeliveryTime + time.Duration(service.MinutesForPayment)*time.Minute
				od = sli.Arrival.Add(-period)
			}
			if od.Unix() < time.Now().Unix() {
				od = time.Time{}
			}
			stations = append(stations, SupplierStationResp{
				ID:           st.StationID,
				MinAmount:    st.MinAmount,
				OrderEndTime: TimeResp(od),
			})
		}
	}
	return &SupplierCategoriesItem{
		SupplierResponseBase: SupplierResponseBase{
			ID:          s.ID,
			Logo:        "/pic/new/n1.jpg",
			Description: s.Description,
		},
		Categories: cat,
		Stations:   stations,
	}, nil
}
