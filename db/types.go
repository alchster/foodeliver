package db

import (
	uuid "github.com/satori/go.uuid"
	"log"
	"time"
)

type (
	UUID               struct{ uuid.UUID }
	RoleID             int32
	OrderStatusCode    int16
	ProductStatusCode  int16
	SupplierStatusCode int16
	Permission         int32
	String             *string
)

type Deletable struct {
	Deleted bool `json:"-" sql:"type:bool;not null;default:false"`
}

type Timestamps struct {
	Created     time.Time  `json:"created" sql:"type:timestamptz;not null;default:now()"`
	LastUpdated *time.Time `json:"lastUpdated" sql:"type:timestamptz;default:null"`
}

func makeString(str string) String {
	if str == "" {
		return nil
	}
	return &str
}

func (t *Timestamps) BeforeSave() error {
	now := time.Now()
	t.LastUpdated = &now
	log.Print(t)
	return nil
}
