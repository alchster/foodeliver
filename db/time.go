package db

import (
	"database/sql/driver"
	"errors"
	"fmt"
	"strconv"
	"strings"
	"time"
)

type Time int16

var InvalidTime = errors.New("Invalid time")

func NewTime(h, m int) Time {
	if h < 0 || m < 0 || time.Duration(h)*time.Hour+time.Duration(m)*time.Minute > 24*time.Hour {
		return -1
	}
	return Time(int16(h)<<8 | int16(m))
}

func (t *Time) fromString(s string) error {
	tmp := strings.SplitN(s, ":", 3)
	if h, errH := strconv.Atoi(tmp[0]); errH == nil {
		if m, errM := strconv.Atoi(tmp[1]); errM == nil {
			*t = Time(int16(h)<<8 | int16(m))
			return nil
		}
	}
	return InvalidTime
}

func (t *Time) Scan(value interface{}) error {
	if value == nil {
		return InvalidTime
	}
	if val, err := driver.String.ConvertValue(value); err == nil {
		if v, ok := val.(string); ok {
			if tm := strings.SplitN(v, " ", 3)[1]; tm != "" {
				if strings.HasPrefix(tm, "23:59") {
					tm = "24:00"
				}
				return t.fromString(tm)
			}
		}
	}
	return InvalidTime
}

func (t Time) Value() (driver.Value, error) {
	tm := t.String()
	if tm == "24:00" {
		tm = "23:59"
	}
	return t.String(), nil
}

func (t Time) String() string {
	h := t >> 8
	m := t & 0xff
	return fmt.Sprintf("%02d:%02d", h, m)
}

func (t Time) MarshalJSON() ([]byte, error) {
	return []byte(strconv.Quote(t.String())), nil
}

func (t *Time) UnmarshalJSON(b []byte) error {
	s, err := strconv.Unquote(string(b))
	if err != nil {
		return err
	}
	return t.fromString(s)
}
