package db

import (
	"fmt"
	"github.com/shopspring/decimal"
)

type OrderInfo struct {
	ID          UUID                        `json:"id"`
	Number      string                      `json:"number"`
	Products    []*BasketProductInfo        `json:"products"`
	Supplier    BasketSupplierInfo          `json:"supplier"`
	Total       decimal.Decimal             `json:"supplier_cost_total"`
	Charge      decimal.Decimal             `json:"supplier_cost_service"`
	StationID   UUID                        `json:"-"`
	productsMap map[UUID]*BasketProductInfo `json:"-"`
	passengerId UUID                        `json:"-"`
	size        int                         `json:"-"`
	minAmount   decimal.Decimal             `json:"-"`
}

func (oi *OrderInfo) Init() {
	oi.productsMap = make(map[UUID]*BasketProductInfo)
}

func (oi *OrderInfo) Add(product UUID, quantity int) (count int, err error) {
	count = 0
	if p, ok := oi.productsMap[product]; ok {
		p.Count += quantity
		count = p.Count
	} else {
		count = quantity
		var prod Product
		if err = db.Where("id = ?", product).First(&prod).Error; err != nil {
			return
		}
		bpi := &BasketProductInfo{
			ID:          prod.ID,
			Name:        prod.Name,
			Description: prod.Description,
			Cost:        prod.Cost,
			Count:       count,
			Image:       prod.Image,
			StationID:   oi.StationID,
		}
		oi.Products = append(oi.Products, bpi)
		oi.productsMap[product] = bpi //&oi.Products[len(oi.Products)-1]
	}
	oi.Calculate()
	return
}

func (oi *OrderInfo) Remove(product UUID, quantity int) (count int, err error) {
	err = NotFound
	count = 0
	if p, ok := oi.productsMap[product]; ok {
		p.Count -= quantity
		count = p.Count
		if count < 1 {
			oi.Delete(product)
		}
		oi.Calculate()
		err = nil
	}
	return
}

func (oi *OrderInfo) Delete(product UUID) {
	for i, prod := range oi.Products {
		if prod.ID == product {
			oi.Products = append(oi.Products[:i], oi.Products[i+1:]...)
			break
		}
	}
	delete(oi.productsMap, product)
	oi.Calculate()
}

func (oi *OrderInfo) Calculate() {
	total := decimal.NewFromFloat(0)
	size := 0
	for _, prod := range oi.Products {
		total = total.Add(prod.Cost.Mul(decimal.NewFromFloat(float64(prod.Count))))
		size += prod.Count
	}
	oi.Total = total
	oi.Charge = calculateCharge(total)
	oi.size = size
}

func (oi *OrderInfo) String() string {
	count := 0
	s := ""
	for _, prod := range oi.Products {
		count += prod.Count
		s += fmt.Sprintf("  product: %s count: %d\n", *(prod.Name.RU), prod.Count)
	}
	return fmt.Sprintf("Order %s: %d products count %d (total: %s, charge: %s)\n%s\n",
		oi.Number, len(oi.Products), count, oi.Total, oi.Charge, s)
}

func calculateCharge(cost decimal.Decimal) decimal.Decimal {
	if cost.Equal(decimal.NewFromFloat(0)) {
		return cost
	}
	percent := decimal.NewFromFloat(float64(service.ChargePercent) / 100.0)
	charge := cost.Mul(percent)
	if charge.LessThan(service.ChargeFixed) {
		charge = service.ChargeFixed
	}
	return charge
}
