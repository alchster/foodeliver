package db

import (
	"errors"
	"github.com/satori/go.uuid"
	"strconv"
	"strings"
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
	PasswordStr        string
)

type PasswordChecker interface {
	GetPassword() string
}

type Entity struct {
	ID        UUID       `json:"id" gorm:"primary_key" sql:"type:uuid"`
	CreatedAt time.Time  `json:"created_at" sql:"type:timestamptz;not null;default:now()"`
	UpdatedAt *time.Time `json:"updated_at" sql:"type:timestamptz;default:null"`
	DeletedAt *time.Time `json:"deleted_at" sql:"type:timestamptz;default:null"`
}

type LoginUser struct {
	Entity
	Login       string      `json:"login" sql:"not null;unique_index;type:varchar(100)"`
	Password    PasswordStr `json:"password" sql:"type:text;not null"`
	Description string      `json:"description" sql:"type:text"`
	Telegram    string      `json:"telegram" sql:"type:varchar(100)"`
	Email       string      `json:"email" sql:"type:varchar(100)"`
	Photo       string      `json:"-" sql:"-"`
	//PhotoURL    string `json:"photo_url"`
}

func makeString(str string) String {
	if str == "" {
		return nil
	}
	return &str
}

func NewID() UUID {
	return UUID{uuid.Must(uuid.NewV4())}
}

func (u UUID) IsZero() bool {
	return u.UUID == uuid.UUID{}
}

// this map is only for temporary password storing
var passwords = make(map[string]string)

func (p *PasswordStr) UnmarshalJSON(b []byte) error {
	str, err := strconv.Unquote(string(b))
	if err != nil {
		return err
	}
	if len(strings.TrimSpace(str)) == 0 {
		return errors.New("Password cannot be empty")
	}
	cr := cryptPassword(str)
	*p = PasswordStr(cr)
	passwords[cr] = str
	return nil
}

func (p PasswordStr) MarshalJSON() ([]byte, error) {
	return []byte("\"\""), nil
}

func (lu LoginUser) GetPassword() string {
	return string(lu.Password)
}

type TimeResp time.Time

func (t TimeResp) String() string {
	if time.Time(t).IsZero() {
		return ""
	}
	loc, _ := time.LoadLocation("Europe/Moscow")
	return time.Time(t).In(loc).Format("2006/01/02 15:04")
}

func (t TimeResp) MarshalJSON() ([]byte, error) {
	if time.Time(t).IsZero() {
		return []byte("null"), nil
	}
	loc, _ := time.LoadLocation("Europe/Moscow")
	str := time.Time(t).In(loc).Format("2006/01/02 15:04")
	return []byte("\"" + str + "\""), nil
}

func (l *LoginUser) AfterCreate() {
	var pass string
	ps := string(l.Password)
	if p, ok := passwords[ps]; ok {
		pass = p
		delete(passwords, ps)
	}
	if pass == "" {
		return
	}
	html, err := mailer.MakeHTML("invite.template", map[string]interface{}{
		"name":     l.Description,
		"login":    l.Login,
		"password": pass,
	})
	if err != nil {
		return
	}
	go mailer.Send(l.Description, l.Email, "Вы успешно зарегистрированы", html)
}
