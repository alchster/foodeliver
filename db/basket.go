package db

import (
	"errors"
	"fmt"
	"github.com/shopspring/decimal"
	//"log"
)

const MAX_ORDER_NUM = 9999

var nodeId = "001"
var freeOrderNum = 1

type BasketInfo struct {
	Orders []OrderInfo     `json:"orders"`
	Total  decimal.Decimal `json:"cost_total"`
	Charge decimal.Decimal `json:"cost_service"`
	Size   int             `json:"size"`
}

type BasketProduct struct {
	PassengerID UUID    `json:"-" gorm:"primary_key"`
	ProductID   UUID    `json:"-" gorm:"primary_key"`
	Product     Product `json:"product" gorm"-"`
	StationID   UUID    `json:"-" gorm:"primary_key"`
	Count       int     `json:"count"`
}

type BasketProductInfo struct {
	ID          UUID            `json:"id"`
	Name        Text            `json:"name"`
	Description Text            `json:"description"`
	Cost        decimal.Decimal `json:"cost"`
	Count       int             `json:"count"`
	Image       string          `json:"image"`
	StationID   UUID            `json:"-"`
}

type BasketSupplierInfo struct {
	ID          UUID                        `json:"id"`
	Description string                      `json:"description"`
	Logo        string                      `json:"logo"`
	Stations    []BasketSupplierStationInfo `json:"stations"`
}

type BasketSupplierStationInfo struct {
	ID           UUID     `json:"id"`
	Name         Text     `json:"name"`
	OrderEndTime TimeResp `json:"order_end_time"`
	Selected     bool     `json:selected`
}

type OrderInfo struct {
	ID       UUID                `json:"id"`
	Number   string              `json:"number"`
	Products []BasketProductInfo `json:"products"`
	Supplier BasketSupplierInfo  `json:"supplier"`
	Total    decimal.Decimal     `json:"supplier_cost_total"`
	Charge   decimal.Decimal     `json:"supplier_cost_service"`
}

func (bp *BasketProduct) AfterFind() error {
	db.Where("id = ?", bp.ProductID).First(&bp.Product)
	return nil
}

func BasketFull(passId string) (*BasketInfo, error) {
	if startTime.IsZero() {
		return nil, errors.New("Start time not set")
	}

	basket, err := Basket(passId)
	if err != nil {
		return nil, err
	}

	sp := make(map[UUID][]BasketProductInfo)
	size := 0
	for _, prod := range basket {
		sid := prod.Product.SupplierID
		bpi := BasketProductInfo{
			ID:          prod.ProductID,
			Name:        prod.Product.Name,
			Description: prod.Product.Description,
			Cost:        prod.Product.Cost,
			Count:       prod.Count,
			StationID:   prod.StationID,
			Image:       prod.Product.Image,
		}
		if bpis, ok := sp[sid]; ok {
			sp[sid] = append(bpis, bpi)
		} else {
			prods := make([]BasketProductInfo, 0, 1)
			prods = append(prods, bpi)
			sp[sid] = prods
		}
		size += prod.Count
	}

	ords := make([]OrderInfo, 0, len(sp))
	var allTotal, allCharge decimal.Decimal

	for suppId, prods := range sp {
		var s Supplier
		if err = db.Where("id = ?", suppId).First(&s).Error; err != nil {
			return nil, err
		}
		supp := BasketSupplierInfo{
			ID:          s.ID,
			Description: s.Description,
			Logo:        s.Photo,
		}

		stationProds := make(map[UUID][]BasketProductInfo)
		for _, p := range prods {
			if sp, ok := stationProds[p.StationID]; ok {
				stationProds[p.StationID] = append(sp, p)
			} else {
				pr := make([]BasketProductInfo, 0, 1)
				pr = append(pr, p)
				stationProds[p.StationID] = pr
			}
		}

		stations := make([]BasketSupplierStationInfo, 0, 1)
		_, sris, err := Stations(s.ID.String())
		if err != nil {
			return nil, err
		}
		for _, sri := range sris {
			stations = append(stations, BasketSupplierStationInfo{
				ID:           sri.Station.ID,
				Name:         sri.Station.Name,
				OrderEndTime: TimeResp(sri.Station.OrderDeadline),
			})
		}

		for stationId, bpis := range stationProds {
			var total, charge decimal.Decimal

			for _, bpi := range bpis {
				total = total.Add(bpi.Cost)
			}
			charge = calculateCharge(total)

			sts := make([]BasketSupplierStationInfo, 0, len(stations))
			for _, st := range stations {
				if st.ID == stationId {
					st.Selected = true
				}
				sts = append(sts, st)
			}

			supp.Stations = sts

			allTotal = allTotal.Add(total)
			allCharge = allCharge.Add(charge)

			ords = append(ords, OrderInfo{
				ID:       NewID(),
				Number:   fmt.Sprintf("%s-%04d", nodeId, freeOrderNum),
				Total:    total,
				Charge:   charge,
				Supplier: supp,
				Products: bpis,
			})
			freeOrderNum += 1
		}
	}

	return &BasketInfo{
		Orders: ords,
		Total:  allTotal,
		Charge: allCharge,
		Size:   size,
	}, nil
}

func Basket(passId string) ([]BasketProduct, error) {
	id, err := GetUUID(passId)
	if err != nil {
		return nil, err
	}
	var tmp, basket []BasketProduct
	db.Where("passenger_id = ?", id).Find(&tmp)
	for _, prod := range tmp {
		if _, ok := stationsMap[prod.StationID]; ok {
			basket = append(basket, prod)
		}
	}
	return basket, nil
}

func AddToBasket(passId, productId, stationId string) error {
	psid, errPass := GetUUID(passId)
	prid, errProd := GetUUID(productId)
	stid, errStat := GetUUID(stationId)
	if errPass != nil || errProd != nil || errStat != nil {
		return errors.New("Invalid ID")
	}
	if err := db.Exec("INSERT INTO basket_products VALUES (?, ?, ?, 1) "+
		"ON CONFLICT (passenger_id, product_id, station_id) DO "+
		"UPDATE SET \"count\" = basket_products.\"count\"+1", psid, prid, stid).Error; err != nil {
		return err
	}
	return nil
}

func RemoveFromBasket(passId, productId, stationId string) error {
	psid, errPass := GetUUID(passId)
	prid, errProd := GetUUID(productId)
	stid, errStat := GetUUID(stationId)
	if errPass != nil || errProd != nil || errStat != nil {
		return errors.New("Invalid ID")
	}
	var bp BasketProduct
	var err error
	if err = db.Where(
		"passenger_id = ? and product_id = ? and station_id = ?",
		psid, prid, stid).First(&bp).Error; err != nil {
		return err
	}
	if bp.Count == 1 {
		err = db.Delete(&bp).Error
	} else {
		bp.Count -= 1
		err = db.Save(&bp).Error
	}
	return err
}

func calculateCharge(cost decimal.Decimal) decimal.Decimal {
	percent := decimal.NewFromFloat(float64(service.ChargePercent) / 100.0)
	charge := cost.Mul(percent)
	if charge.LessThan(service.ChargeFixed) {
		charge = service.ChargeFixed
	}
	return charge
}
