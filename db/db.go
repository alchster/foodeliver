package db

import (
	"github.com/alchster/foodeliver/mail"
	"github.com/alchster/foodeliver/storage"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"log"
)

var (
	db        *gorm.DB
	debugMode bool
	store     storage.Storage
	mailer    *mail.Mailer
)

func Raw(query string) *gorm.DB {
	return db.Raw(query)
}

func Open(uri string, debug bool, s storage.Storage, m *mail.Mailer) error {
	debugMode = debug
	store = s
	mailer = m
	if debugMode {
		log.Print("Connecting to database")
	}
	var err error
	if db, err = gorm.Open("postgres", uri); err != nil {
		return err
	}
	db.LogMode(debugMode)
	createBanknotesMap()
	supplierOrderStatuses = getSupplierOrderStatuses()

	return nil
}

func Migrate() error {
	if err := db.AutoMigrate(
		&Text{},
		&SupplierStatus{},
		&ProductStatus{},
		&OrderStatus{},
	).Error; err != nil {
		return err
	}
	if err := migrateEntities(); err != nil {
		return err
	}
	createStatuses()
	createBaseService()
	createAdmin()
	return nil
}

func Close() {
	db.Close()
	if debugMode {
		log.Print("Closing connection to database")
	}
}

func Ping() error {
	return db.DB().Ping()
}
