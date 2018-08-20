package db

import (
	"github.com/shopspring/decimal"
	"time"
)

type Product struct {
	Entity
	Name            Text              `json:"name" gorm:"foreignkey:NameID;association_foreignkey:ID"`
	NameID          UUID              `json:"-" sql:"type:uuid REFERENCES texts(id)"`
	Description     Text              `json:"description" gorm:"foreignkey:DescriptionID;association_foreignkey:ID"`
	DescriptionID   UUID              `json:"-" sql:"type:uuid REFERENCES texts(id)"`
	Category        Text              `json:"category" gorm:"foreignkey:CategoryID;association_foreignkey:ID"`
	CategoryID      UUID              `json:"-" sql:"type:uuid REFERENCES texts(id)"`
	Supplier        Supplier          `json:"-" gorm:"foreignkey:SupplierID;association_foreignkey:ID"`
	SupplierID      UUID              `json:"-" sql:"type:uuid REFERENCES suppliers(id)"`
	Status          ProductStatus     `json:"status" gorm:"foreignkey:StatusCode; association_foreignkey:Code"`
	StatusCode      ProductStatusCode `json:"status_code" sql:"type:smallint REFERENCES product_statuses(code)"`
	Cost            decimal.Decimal   `json:"cost" gorm:"type:numeric"`
	UnavailableFrom *time.Time        `json:"unavailable_from" sql:"type:timestamptz;default:null"`
	UnavailableTo   *time.Time        `json:"unavailable_to" sql:"type:timestamptz;default:null"`
}

func (p *Product) AfterFind() error {
	db.Where("id = ?", p.NameID).First(&p.Name)
	db.Where("id = ?", p.CategoryID).First(&p.Category)
	db.Where("id = ?", p.DescriptionID).First(&p.Description)
	return nil
}
