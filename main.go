package main

import (
	api_v1 "github.com/alchster/foodeliver/api/v1"
	"github.com/alchster/foodeliver/db"
	"github.com/alchster/foodeliver/i18n"
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

	if err = db.Open(config.Database.String(), config.Debug); err != nil {
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

	err = api_v1.Setup(router, config.Prefix, config.TrainID)
	if err != nil {
		log.Print(err)
		return
	}

	router.Run(config.ListenOn)
}
