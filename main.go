package main

import (
	"errors"
	api_v1 "github.com/alchster/foodeliver/api/v1"
	"github.com/alchster/foodeliver/db"
	"github.com/alchster/foodeliver/i18n"
	"github.com/alchster/foodeliver/mail"
	"github.com/alchster/foodeliver/storage"
	"github.com/gin-gonic/gin"
	"log"
	"os"
)

func main() {
	config, err := loadConfig()
	if err != nil {
		log.Fatal("Configuration error:", err)
	}
	if config.Debug {
		log.Print(config)
		gin.SetMode(gin.DebugMode)
	} else {
		gin.SetMode(gin.ReleaseMode)
	}
	log.Print(config)

	var store storage.Storage
	if store, err = storage.NewFSStorage(config.Storage); err != nil {
		log.Fatal("Storage error:", err)
	}

	var mailer *mail.Mailer
	if config.Mailer.Server != "" {
		c := config.Mailer
		if mailer = mail.NewMailer(c.Server, c.User, c.Password, c.From, c.Templates, c.URL, c.Options,
			config.Debug); mailer == nil {
			log.Fatal("Mailer error:", errors.New("Unable to configure mailer"))
		}
	}

	if err = db.Open(config.Database.String(), config.Debug, store, mailer); err != nil {
		log.Fatal("Database error:", err)
	}
	defer db.Close()
	if config.Migrate {
		if err = db.Migrate(); err != nil {
			log.Fatal("Migration error:", err)
		}
		log.Print("Migration succeeded")
		os.Exit(0)
	}

	i18n.LoadLanguage("en")
	i18n.LoadLanguage("ru")

	router := gin.Default()
	//router.Use(gin.Logger())
	router.Use(gin.Recovery())

	err = api_v1.Setup(router, config.Prefix, config.TrainID, config.NodeID, store)
	if err != nil {
		log.Print(err)
		return
	}

	router.Run(config.ListenOn)
}
