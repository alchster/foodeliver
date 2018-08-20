package db

type Text struct {
	ID UUID   `json:"-" gorm:"primary_key;type:uuid"`
	EN String `json:"en",gorm:"not null"`
	RU String `json:"ru"`
	ZH String `json:"zh"`
}

type TextReference struct {
	Status *Text `json:"status" gorm:"association_autoupdate:false;foreignkey:TextID;association_foreignkey:ID"`
	TextID UUID  `json:"-" sql:"type:uuid REFERENCES texts(id)"`
}

func NewText(en, ru, zh string) *Text {
	return &Text{
		ID: NewID(),
		EN: makeString(en),
		RU: makeString(ru),
		ZH: makeString(zh),
	}
}
