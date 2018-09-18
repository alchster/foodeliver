package db

import (
	"fmt"
	"github.com/shopspring/decimal"
	"math/rand"
	"sort"
	"time"
)

type Product struct {
	Entity
	Name            Text              `json:"name" gorm:"foreignkey:NameID;association_foreignkey:ID"`
	NameID          UUID              `json:"-" sql:"type:uuid REFERENCES texts(id)"`
	Description     Text              `json:"description" gorm:"foreignkey:DescriptionID;association_foreignkey:ID"`
	DescriptionID   UUID              `json:"-" sql:"type:uuid REFERENCES texts(id)"`
	Category        Text              `json:"category" gorm:"foreignkey:CategoryID;association_foreignkey:ID"`
	CategoryID      UUID              `json:"category_id" sql:"type:uuid REFERENCES texts(id)"`
	Supplier        Supplier          `json:"-" gorm:"foreignkey:SupplierID;association_foreignkey:ID"`
	SupplierID      UUID              `json:"supplier_id" sql:"type:uuid REFERENCES suppliers(id)"`
	Status          ProductStatus     `json:"status" gorm:"foreignkey:StatusCode; association_foreignkey:Code"`
	StatusCode      ProductStatusCode `json:"status_code" sql:"type:smallint REFERENCES product_statuses(code)"`
	StatusText      string            `json:"status_text"`
	Cost            decimal.Decimal   `json:"cost" gorm:"type:numeric"`
	Image           string            `json:"image"`
	UnavailableFrom *time.Time        `json:"unavailable_from" sql:"type:timestamptz;default:null"`
	UnavailableTo   *time.Time        `json:"unavailable_to" sql:"type:timestamptz;default:null"`
}

func (p *Product) BeforeCreate() {
	p.ID = NewID()
	p.Name.ID = NewID()
	p.Description.ID = NewID()
	p.StatusCode = PRODUCT_STATUS_NEW
}

func (p *Product) AfterFind() error {
	db.Where("id = ?", p.NameID).First(&p.Name)
	db.Where("id = ?", p.CategoryID).First(&p.Category)
	db.Where("id = ?", p.DescriptionID).First(&p.Description)
	db.Where("code = ?", p.StatusCode).First(&p.Status)
	db.Where("id = ?", p.SupplierID).First(&p.Supplier)
	var txt Text
	db.Where("id = ?", p.Status.TextID).First(&txt)
	(*p).Status.Status = txt
	//FIXME: remove this when storage be ready
	if p.Image == "" {
		p.Image = fmt.Sprintf("/pic/food/food-%d.png", rand.Int()%32+1)
	}
	return nil
}

type Category struct {
	ID   UUID   `json:"id"`
	Name string `json:"name"`
}

func SupplierCategories(supId UUID) ([]Category, error) {
	rows, _ := db.Table("products").Joins("JOIN texts on category_id = texts.id").Order("ru").
		Where("supplier_id = ?", supId).Select("DISTINCT(category_id), ru").Rows()
	defer rows.Close()
	cats := make([]Category, 0)
	for rows.Next() {
		var id UUID
		var txt string
		rows.Scan(&id, &txt)
		cats = append(cats, Category{id, txt})
	}
	return cats, nil
}

func SupplierCatalogProducts(supId UUID) ([]Product, error) {
	var prods []Product
	if err := db.Where("supplier_id = ?", supId).Find(&prods).Error; err != nil {
		return nil, err
	}
	return prods, nil
}

func ModeratorSuppliers(modId UUID) ([]Supplier, error) {
	var u User
	if err := db.Preload("AllowedSuppliers").Where("id = ?", modId).First(&u).Error; err != nil {
		return nil, err
	}
	sups := u.AllowedSuppliers
	sort.Slice(sups[:], func(i, j int) bool {
		return sups[i].Description < sups[j].Description
	})
	return sups, nil
}

func ModeratorCatalog(modId UUID) (sups []Supplier, prods []Product, cats []Text,
	stats []Station, statuses []ProductStatus, err error) {
	db.Order("code").Find(&statuses)
	for i, _ := range statuses {
		statuses[i].Color = productStatusColors[statuses[i].Code]
	}
	sups, err = ModeratorSuppliers(modId)
	if err != nil {
		return
	}
	sids := make([]UUID, 0, len(sups))
	for _, s := range sups {
		sids = append(sids, s.ID)
	}
	if err = db.Where("supplier_id in (?)", sids).Find(&prods).Error; err != nil {
		return
	}
	cm := make(map[UUID]Text)
	for _, p := range prods {
		cm[p.CategoryID] = p.Category
	}
	cats = make([]Text, 0, len(cm))
	for _, c := range cm {
		cats = append(cats, c)
	}
	sort.Slice(cats, func(i, j int) bool {
		return *cats[i].RU < *cats[j].RU
	})
	if err = db.Model(&SupplierStation{}).Where("supplier_id in (?)", sids).
		Pluck("station_id", &sids).Error; err != nil {
		return
	}
	err = db.Joins("JOIN texts ON texts.id = text_id").Order("texts.ru").Find(&stats).Error
	return
}
