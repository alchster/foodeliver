package db

import (
	"errors"
	"strconv"
	"strings"
	"time"
)

var trainID UUID
var trainNumber string
var startTime time.Time
var stations []Station
var stationsList []StationsListItem
var stationsMap map[UUID]int
var stationsIds []UUID
var service Service

var InvalidNode = errors.New("Invalid node ID")

type Train struct {
	Entity
	Name   Text   `json:"name" gorm:"foreignkey:TextID;association_foreignkey:ID"`
	TextID UUID   `json:"-" sql:"type:uuid REFERENCES texts(id)"`
	Number string `json:"number"`
	Alias  string `json:"alias"`
	Active bool   `json:"active"`
}

type StationsListItem struct {
	TrainID           UUID          `json:"-" sql:"type:uuid REFERENCES trains(id)`
	Station           Station       `json:"station" gorm:"foreignkey:StationID;association_foreignkey:ID"`
	StationID         UUID          `json:"-" sql:"type:uuid REFERENCES stations(id)`
	RelativeArrival   time.Duration `json:"-"`
	RelativeDeparture time.Duration `json:"-"`
	Arrival           time.Time     `json:"-" gorm:"-"`
	Departure         time.Time     `json:"-" gorm:"-"`
	Nearest           bool          `json:"nearest" gorm:"-"`
	HasDelivery       bool          `json:"-" gorm:"-"`
	FastestDelivery   time.Time     `json:"-" sql:"-"`
}

func (t *Train) BeforeCreate() error {
	t.ID = NewID()
	if *t.Name.EN == "" && *t.Name.RU == "" && *t.Name.ZH == "" {
		return errors.New("Train name cannot be empty")
	}
	t.Name.ID = NewID()
	return nil
}

func (t *Train) BeforeSave() error {
	u := UUID{}
	if t.TextID == u {
		db.Table("stations").Select("text_id").Where("id = ?", t.ID).Scan(&t.TextID)
	}
	return nil
}

func (t *Train) AfterFind() error {
	db.Find(&t.Name, "id = ?", t.TextID)
	return nil
}

func (sli *StationsListItem) AfterFind() error {
	sli.Arrival = startTime.Add(sli.RelativeArrival)
	sli.Departure = startTime.Add(sli.RelativeDeparture)
	db.Where("id = ?", sli.StationID).First(&sli.Station)
	var ss SupplierStation
	db.Order("delivery_time").Where("station_id = ?", sli.StationID).First(&ss)
	if sli.Station.ID == ss.StationID {
		sli.HasDelivery = true
	}
	var period time.Duration
	if sli.RelativeDeparture-sli.RelativeArrival > 5*time.Minute {
		period = 5*time.Minute + ss.DeliveryTime +
			time.Duration(service.MinutesForPayment)*time.Minute
		sli.FastestDelivery = sli.Departure.Add(-period)
	} else {
		period = ss.DeliveryTime + time.Duration(service.MinutesForPayment)*time.Minute
		sli.FastestDelivery = sli.Arrival.Add(-period)
	}
	return nil
}

func SetStart(start string, tid UUID, node string) error {
	node = strings.TrimSpace(node)
	if node == "" || len(node) < 3 {
		return InvalidNode
	}
	trainID = tid
	tm, err := time.Parse(time.RFC3339, start)
	if err != nil {
		return err
	}
	if err = db.First(&service).Error; err != nil {
		return errors.New("Service not found")
	}
	startTime = tm.Truncate(time.Minute)
	if stationsList, _, err = Stations(""); err != nil {
		return err
	}
	stations = make([]Station, len(stationsList))
	stationsMap = make(map[UUID]int)
	stationsIds = make([]UUID, len(stationsList))
	for i, si := range stationsList {
		var s Station
		if err := db.Where("id = ?", si.StationID).First(&s).Error; err != nil {
			return err
		}
		stations[i] = s
		stationsMap[si.StationID] = i
		stationsIds[i] = si.StationID
	}
	var lastNumbers []string
	initNum := 0
	if err := db.Model(&Order{}).Where("number LIKE ?", node+"%").Order("number desc").
		Limit(1).Pluck("number", &lastNumbers).Error; err == nil && len(lastNumbers) > 0 {
		tmp := strings.SplitN(lastNumbers[0], "-", 2)
		if initNum, err = strconv.Atoi(tmp[1]); err != nil {
			return err
		}
	}
	tmpOrders.Init(node, initNum)
	return nil
}

func TrainID(number string) (UUID, error) {
	t := Train{}
	if err := db.Where("number = ?", number).First(&t).Error; err != nil {
		return UUID{}, err
	}
	trainNumber = number
	return t.ID, nil
}

type StationResp struct {
	ID            UUID      `json:"id"`
	Name          Text      `json:"name"`
	Arrival       TimeResp  `json:"arrival"`
	Stop          int       `json:"stop"`
	Nearest       bool      `json:"nearest"`
	OrderDeadline time.Time `json:"-"`
}

type StationsResponseItem struct {
	Station StationResp `json:"station"`
}

func Stations(suppId string) ([]StationsListItem, []StationsResponseItem, error) {
	if startTime.IsZero() {
		return nil, nil, errors.New("Start time not set")
	}
	var supplierId UUID
	var err error
	if suppId != "" {
		if supplierId, err = GetUUID(suppId); err != nil {
			return nil, nil, err
		}
	}
	var lst []StationsListItem
	if err := db.Where("train_id = ?", trainID).Order("relative_arrival").Find(&lst).Error; err != nil {
		return nil, nil, err
	}
	now := time.Now()
	nearFound := false
	var res []StationsResponseItem
	for i, sli := range lst {
		if !sli.HasDelivery {
			continue
		}
		if suppId != "" {
			var ss SupplierStation
			if db.Where("station_id = ? and supplier_id = ?",
				sli.StationID, supplierId).First(&ss).Error != nil {
				continue
			}
			var period time.Duration
			if sli.RelativeDeparture-sli.RelativeArrival > 5*time.Minute {
				period = 5*time.Minute + ss.DeliveryTime +
					time.Duration(service.MinutesForPayment)*time.Minute
				sli.FastestDelivery = sli.Departure.Add(-period)
			} else {
				period = ss.DeliveryTime + time.Duration(service.MinutesForPayment)*time.Minute
				sli.FastestDelivery = sli.Arrival.Add(-period)
			}
		}
		if !nearFound && sli.FastestDelivery.Sub(now) > 0 {
			lst[i].Nearest = true
			nearFound = true
		}
		res = append(res, StationsResponseItem{
			StationResp{
				ID:            sli.Station.ID,
				Name:          sli.Station.Name,
				Arrival:       TimeResp(sli.Arrival),
				Stop:          int(sli.Departure.Sub(sli.Arrival) / time.Minute),
				Nearest:       lst[i].Nearest,
				OrderDeadline: sli.FastestDelivery,
			},
		})
	}
	return lst, res, nil
}

func stationSupplierDeadline(station, supplier UUID) time.Time {
	if idx, ok := stationsMap[station]; ok {
		var ss SupplierStation
		if db.Where("station_id = ? and supplier_id = ?",
			station, supplier).First(&ss).Error != nil {
			return time.Time{}
		}
		sli := stationsList[idx]
		var period time.Duration
		var deadline time.Time
		if sli.RelativeDeparture-sli.RelativeArrival > 5*time.Minute {
			period = 5*time.Minute + ss.DeliveryTime +
				time.Duration(service.MinutesForPayment)*time.Minute
			deadline = sli.Departure.Add(-period)
		} else {
			period = ss.DeliveryTime + time.Duration(service.MinutesForPayment)*time.Minute
			deadline = sli.Arrival.Add(-period)
		}
		return deadline
	}
	return time.Time{}
}
