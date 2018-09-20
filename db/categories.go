package db

type Category struct {
	ID   UUID   `json:"id" gorm:"type:uuid REFERENCES texts(id)"`
	Name string `json:"name" gorm:"-"`
	Text Text   `json:"-" gorm:"-"`
}

func (c *Category) AfterFind() {
	db.Model(&Text{}).Where("id = ?", c.ID).First(&c.Text)

	if !(c.Text.ID == UUID{}) {
		c.Name = *c.Text.RU
	}
}
