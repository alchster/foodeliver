package db

import (
	"github.com/shopspring/decimal"
)

type Order struct {
	Entity
	Number      string          `json:"number"`
	TrainID     UUID            `json:"train_id" gorm:type:"uuid REFERENCES trains(id)"`
	TrainNumber string          `json:"train_number" gorm:"-"`
	CarNumber   int             `json:"car_number"`
	Place       int             `json:"place"`
	Total       decimal.Decimal `json:"total" gorm:"type:numeric"`
	Charge      decimal.Decimal `json:"charge" gorm:"type:numeric"`
	Status      OrderStatus     `json:"status" gorm:"foreignkey:StatusCode; association_foreignkey:Code"`
	StatusCode  OrderStatusCode `json:"status_code" sql:"type:smallint REFERENCES order_statuses(code)"`
	Supplier    Supplier        `json:"supplier" gorm:"foreignkey:SupplierID;association_foreignkey:ID"`
	SupplierID  UUID            `json:"-" sql:"type:uuid REFERENCES suppliers(id)"`
	Products    []Product       `json:"products" gorm:"many2many"`
}
