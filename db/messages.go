package db

import (
	"time"
)

type Message struct {
	Entity
	Sender   UUID       `gorm:"index"`
	Receiver UUID       `gorm:"index"`
	Read     *time.Time `gorm:"type:timestamptz;default:null"`
	Text     string
}

func (m *Message) AfterSave() {
	// TODO: notify user
}
