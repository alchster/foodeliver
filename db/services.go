package db

import (
	"github.com/shopspring/decimal"
)

type PaymentType int

const (
	CASH PaymentType = iota
	PLASTIC_OFFLINE
	PLASTIC_ONLINE
)

type Service struct {
	Entity
	Name              string          `json:"name"`
	Cash              bool            `json:"cash"`
	PlasticOffline    bool            `json:"plastic_offline"`
	PlasticOnline     bool            `json:"plastic_online"`
	ChargePercent     int             `json:"charge_percent"`
	ChargeFixed       decimal.Decimal `json:"charge_fixed" gorm:"type:numeric"`
	MinutesForPayment int             `json:"minutes_for_payment"`
	MsgRepeatMinutes  int             `json:"msg_repeat_minutes"`
}

func (s *Service) BeforeCreate() error {
	s.ID = NewID()
	return nil
}
