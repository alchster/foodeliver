package db

import (
	"errors"
	"github.com/shopspring/decimal"
	"time"
)

const DEFAULT_TZ = "Europe/Moscow"

type Station struct {
	Entity
	Name           Text            `json:"name" gorm:"foreignkey:TextID;association_foreignkey:ID"`
	TextID         UUID            `json:"-" sql:"type:uuid REFERENCES texts(id)"`
	TZ             string          `json:"tz"`
	Active         bool            `json:"active"`
	OrderDeadline  time.Time       `json:"order_deadline" sql:"-"`
	OrderAvailable bool            `json:"order_available" sql:"-"`
	MinAmount      decimal.Decimal `json:"min_amount" sql:"-"`
}

func (s *Station) BeforeCreate() error {
	s.ID = NewID()
	if *s.Name.EN == "" && *s.Name.RU == "" && *s.Name.ZH == "" {
		return errors.New("Station name cannot be empty")
	}
	s.Name.ID = NewID()
	if s.TZ == "" {
		s.TZ = DEFAULT_TZ
	}
	return nil
}

func (s *Station) BeforeSave() error {
	u := UUID{}
	if s.TextID == u {
		db.Table("stations").Select("text_id").Where("id = ?", s.ID).Scan(&s.TextID)
	}
	//db.Find(&s.Name, "id = ?", s.TextID)
	return nil
}

func (s *Station) AfterFind() error {
	db.Find(&s.Name, "id = ?", s.TextID)
	return nil
}
