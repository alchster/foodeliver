package main

import (
	api_v1 "github.com/alchster/foodeliver/api/v1"
	"github.com/alchster/foodeliver/db"
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

	router := gin.Default()
	router.Use(gin.Logger())
	router.Use(gin.Recovery())

	api_v1.Setup(router, config.Prefix)

	router.Run(config.ListenOn)
}
