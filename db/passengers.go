package db

import ()

type Passenger struct {
	Entity
	Fingerprint string  `json:"fingerprint" gorm:"not null;unique_index"`
	Login       String  `json:"login" gorm:"default:null;unique"`
	Password    String  `json:"password" gorm:"default:null"`
	FirstName   String  `json:"firstname" gorm:"default:null"`
	LastName    String  `json:"lastname" gorm:"default:null"`
	Email       String  `json:"email" gorm:"default:null;unique"`
	Phone       String  `json:"phone" gorm:"default:null;unique"`
	Orders      []Order `json:"orders" gorm:"many2many:passenger_orders"`
}

func PassengerByFingerprint(fingerprint string) (*Passenger, error) {
	p := new(Passenger)
	if err := db.Where("fingerprint = ?", fingerprint).First(p).Error; err != nil {
		p.ID = NewID()
		p.Fingerprint = fingerprint
		if err := db.Save(p).Error; err != nil {
			return nil, err
		}
	}
	return p, nil
}
