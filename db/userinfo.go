package db

import (
	"errors"
	"strings"
)

type UserInfo struct {
	ID        UUID
	Type      string
	Role      string
	RoleRU    string
	FirstName string
	Login     string
	LastName  string
	Photo     string
	NewMail   int
}

var (
	InvalidUserID   = errors.New("Invalid user ID")
	InvalidUserRole = errors.New("Invalid user role")
)

func GetUserInfo(userId, role string) (*UserInfo, error) {
	uid, err := GetUUID(userId)
	id := UUID{uid}
	var lu *LoginUser
	var roleRu string
	t := "user"
	switch role {
	case "administrator":
		lu, err = userInfo(id)
		roleRu = "Администратор"
	case "moderator":
		lu, err = userInfo(id)
		roleRu = "Модератор"
	case "supplier":
		lu, err = supplierInfo(id)
		t = role
		roleRu = "Поставщик"
	default:
		return nil, InvalidUserRole
	}

	if err != nil {
		return nil, err
	}

	first, last := names(lu.Description)
	return &UserInfo{
		ID:        lu.ID,
		Type:      t,
		Role:      role,
		RoleRU:    roleRu,
		Login:     lu.Login,
		FirstName: first,
		LastName:  last,
		Photo:     "pic/user.jpg",
	}, nil
}

func userInfo(id UUID) (*LoginUser, error) {
	var u User
	if db.Where("id = ?", id).First(&u).Error != nil {
		return nil, InvalidUserID
	}
	return &u.LoginUser, nil
}

func supplierInfo(id UUID) (*LoginUser, error) {
	var s Supplier
	if db.Where("id = ?", id).First(&s).Error != nil {
		return nil, InvalidUserID
	}
	return &s.LoginUser, nil
}

func names(desc string) (first string, last string) {
	str := strings.Split(desc, " ")
	switch len(str) {
	case 1:
		first = str[0]
	case 2:
		first = str[0]
		last = str[1]
	case 3:
		first = strings.Join(str[:1], " ")
		last = str[2]
	default:
		first = desc
	}
	return
}
