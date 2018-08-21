package db

import (
	"errors"
	"strings"
)

type UserInfo struct {
	ID        UUID
	Role      string
	FirstName string
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

	switch role {
	case "administrator", "moderator":
		lu, err = userInfo(id)
	case "supplier":
		lu, err = supplierInfo(id)
	default:
		return nil, InvalidUserRole
	}

	if err != nil {
		return nil, err
	}

	first, last := names(lu.Description)
	return &UserInfo{
		ID:        lu.ID,
		Role:      role,
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
