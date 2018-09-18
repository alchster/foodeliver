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

var banknotesInfo = []int{100, 200, 500, 1000, 2000, 5000}
var banknotes map[int]bool

type PaymentStatus struct {
	Status bool `json:"status"`
}

type CashInfo struct {
	PaymentStatus
	Banknotes []int `json:"banknotes"`
}

type PaymentResp struct {
	Cash        CashInfo      `json:"cash"`
	CardOffline PaymentStatus `json:"card_agent"`
	CardOnline  PaymentStatus `json:"card_online"`
}

func PaymentMethods() (*PaymentResp, error) {
	if startTime.IsZero() {
		return nil, TimeNotSet
	}
	return &PaymentResp{
		Cash: CashInfo{
			PaymentStatus{service.Cash},
			banknotesInfo,
		},
		CardOffline: PaymentStatus{service.PlasticOffline},
		CardOnline:  PaymentStatus{service.PlasticOnline},
	}, nil
}

func createBanknotesMap() {
	banknotes = make(map[int]bool)
	for _, b := range banknotesInfo {
		banknotes[b] = true
	}
}

func createBaseService() {
	db.Save(&Service{
		Entity: Entity{ID: NewID()},
		Name:   "Food delivery",
	})
}
