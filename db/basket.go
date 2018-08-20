package db

import (
	"errors"
	"fmt"
	"github.com/shopspring/decimal"
)

const MAX_ORDER_NUM = 9999

var nodeId = "001"
var freeOrderNum = 1

type BasketInfo struct {
	Orders []Order         `json:"orders"`
	Total  decimal.Decimal `json:"total"`
	Charge decimal.Decimal `json:"charge"`
	Size   int             `json:"size"`
}

type BasketProduct struct {
	PassengerID UUID    `json:"-" gorm:"primary_key"`
	ProductID   UUID    `json:"-" gorm:"primary_key"`
	Product     Product `json:"product" gorm"-"`
	StationID   UUID    `json:"-" gorm:"primary_key"`
	Count       int     `json:"count"`
}

func (bp *BasketProduct) AfterFind() error {
	db.Where("id = ?", bp.ProductID).First(&bp.Product)
	return nil
}

func BasketFull(passId string) (*BasketInfo, error) {
	basket, err := Basket(passId)
	if err != nil {
		return nil, err
	}
	sp := make(map[UUID][]Product)
	size := 0
	for _, prod := range basket {
		sid := prod.Product.SupplierID
		if ords, ok := sp[sid]; ok {
			sp[sid] = append(ords, prod.Product)
		} else {
			prods := make([]Product, 0, 1)
			prods = append(prods, prod.Product)
			sp[sid] = prods
		}
		size += prod.Count
	}
	ords := make([]Order, 0, len(sp))
	var allTotal, allCharge decimal.Decimal
	for suppId, prods := range sp {
		var supp Supplier
		if err = db.Where("id = ?", suppId).First(&supp).Error; err != nil {
			return nil, err
		}
		var total, charge decimal.Decimal
		for _, p := range prods {
			total.Add(p.Cost)
		}
		charge = calculateCharge(total)
		allTotal.Add(total)
		allCharge.Add(charge)
		var status OrderStatus
		db.Where("code = ?", ORDER_STATUS_NEW).First(&status)
		ords = append(ords, Order{
			Number:      fmt.Sprintf("%s-%04d", nodeId, freeOrderNum),
			TrainID:     trainID,
			TrainNumber: trainNumber,
			Total:       total,
			Charge:      charge,
			Supplier:    supp,
			Status:      status,
			StatusCode:  status.Code,
			Products:    prods,
		})
		freeOrderNum += 1
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
