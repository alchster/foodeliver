package db

import (
	"errors"
	"golang.org/x/crypto/bcrypt"
	"time"
)

type User struct {
	ID          UUID   `json:"id" gorm:"primary_key" sql:"type:uuid;default:uuid_generate_v4()"`
	Login       string `json:"login" sql:"not null;unique_index;type:varchar(50)"`
	Password    string `json:"password" sql:"type:text;not null"`
	Description string `json:"description" sql:"type:text"`
	Admin       bool   `json:"admin" sql:"type:bool;not null;default:false"`
	Timestamps
	Deletable
}

func (u *User) BeforeSave() error {
	if err := u.Timestamps.BeforeSave(); err != nil {
		return err
	}
	if u.Password == "" {
		return errors.New("password must not be empty")
	}
	if cost, err := bcrypt.Cost([]byte(u.Password)); err != nil || cost == 0 {
		u.Password = cryptPassword(u.Password)
	}
	return nil
}

func (u *User) BeforeCreate() error {
	obj := User{}
	if db.Where("login = ? and deleted", u.Login).First(&obj).Error == nil {
		obj.Password = u.Password
		obj.Description = u.Description
		obj.Deleted = false
		obj.Created = time.Now()
		if err := db.Save(&obj).Error; err != nil {
			return err
		}
		return errors.New("User with '" + u.Login + "' already found as deleted. Undeleted")
	}
	return nil
}

func CheckLogin(login, password string) (*User, error) {
	u := new(User)
	if err := db.Where(
		"login = ? and not deleted and password = crypt(?, password)", login, password,
	).First(u).Error; err != nil {
		return nil, err
	}
	return u, nil
}

func cryptPassword(password string) string {
	hash, _ := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(hash)
}

func checkPassword(hash, password string) bool {
	return bcrypt.CompareHashAndPassword([]byte(hash), []byte(password)) == nil
}
