package db

import (
	"errors"
	"github.com/chr4/pwgen"
	"github.com/jinzhu/gorm"
	"golang.org/x/crypto/bcrypt"
	"log"
	"strings"
)

type User struct {
	LoginUser
	Admin            bool       `json:"admin" sql:"type:bool;not null;default:false"`
	Enabled          bool       `json:"enabled" sql:"type:bool;not null;default:true"`
	AllowedSuppliers []Supplier `json:"allowed_suppliers" gorm:"many2many:user_suppliers"`
}

func (u *User) BeforeSave() error {
	pass := u.GetPassword()
	if strings.TrimSpace(u.Login) == "" || strings.TrimSpace(pass) == "" {
		return errors.New("Neither login nor password can be empty")
	}
	if cost, err := bcrypt.Cost([]byte(u.GetPassword())); err != nil || cost == 0 {
		u.Password = PasswordStr(cryptPassword(u.GetPassword()))
	}
	return nil
}

func (u *User) BeforeCreate() error {
	u.ID = NewID()
	return nil
}

func (u *User) BeforeDelete(tx *gorm.DB) error {
	login := "deleted__" + u.Login + "__" + u.ID.String()
	return tx.Model(&User{}).Where("id = ?", u.ID).UpdateColumn("login", login).Error
}

func createAdmin() error {
	pass := pwgen.AlphaNum(16)
	admin := User{
		LoginUser: LoginUser{
			Login:       "admin",
			Password:    PasswordStr(pass),
			Description: "Built-in service administrator",
		},
		Admin: true,
	}
	if err := db.Create(&admin).Error; err != nil {
		return err
	}
	log.Printf("Created admin user\n\tID:\t\t%v\n\tPassword:\t%v", admin.ID, pass)
	return nil
}
