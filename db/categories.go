package db

import (
	"errors"
)

type Category struct {
	ID   UUID   `json:"id" gorm:"type:uuid REFERENCES texts(id)"`
	Name string `json:"name" gorm:"-"`
	Text Text   `json:"text" gorm:"-"`
}

var InvalidName = errors.New("Invalid category name")

func (c *Category) BeforeSave() error {
	var text Text
	if (c.ID == UUID{}) {
		if c.Name == "" {
			return InvalidName
		}
		text = NewText(c.Name, c.Name, "")
		c.ID = text.ID
	} else {
		if err := db.Where("id = ?", c.ID).First(&text).Error; err != nil {
			return err
		}
		text.RU = makeString(c.Name)
		text.EN = text.RU
	}
	if err := db.Save(&text).Error; err != nil {
		return err
	}
	return nil
}

func (c *Category) AfterFind() {
	db.Model(&Text{}).Where("id = ?", c.ID).First(&c.Text)

	if !(c.Text.ID == UUID{}) {
		c.Name = *c.Text.RU
	}
}

func Categories() (cats []Category, err error) {
	err = db.Joins("JOIN texts ON categories.id = texts.id").Order("ru").Find(&cats).Error
	return
}
