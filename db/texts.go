package db

type Text struct {
	ID UUID   `json:"-" gorm:"primary_key;type:uuid" sql:"default:uuid_generate_v4();"`
	EN String `json:"en",gorm:"not null"`
	RU String `json:"ru"`
	ZH String `json:"zh"`
}

func NewText(en, ru, zh string) *Text {
	return &Text{
		EN: makeString(en),
		RU: makeString(ru),
		ZH: makeString(zh),
	}
}
