package api_v1

import (
	"github.com/alchster/foodeliver/db"
	"github.com/gin-gonic/gin"
)

var trainID db.UUID

func Setup(router *gin.Engine, baseUrl string, train string) error {
	v1 := router.Group(baseUrl)
	if train == "" {
		authMiddleware = newAuthMiddlware("hello")
		router.POST("/login", authMiddleware.LoginHandler)
		v1.Use(authMiddleware.MiddlewareFunc())
		v1.GET("/me", me)
		v1.GET("/ping", ping)
		v1.GET("/refresh_token", authMiddleware.RefreshHandler)
		v1.POST("/check_password", checkPassword)
		for _, entity := range db.EntitiesList {
			update := updater(entity)
			v1.GET("/"+entity, allReader(entity))
			v1.POST("/"+entity, creator(entity))
			v1.GET("/"+entity+"/:id", reader(entity))
			v1.PUT("/"+entity, notAllowed)
			v1.PUT("/"+entity+"/:id", update)
			v1.PATCH("/"+entity, notAllowed)
			v1.PATCH("/"+entity+"/:id", update)
			v1.DELETE("/"+entity, notAllowed)
			v1.DELETE("/"+entity+"/:id", deleter(entity))
		}
	} else {
		var err error
		trainID, err = db.TrainID(train)
		if err != nil {
			return err
		}
		v1.POST("/service/start_time", setStartTime)
		v1.GET("/stations", stationsList)
		v1.GET("/suppliers", suppliersList)
		v1.GET("/products", supplierProducts)
		v1.GET("/get_passenger_id", passengerByFingerprint)
		v1.GET("/basket", basket)
		v1.POST("/addtobasket", basketAdd)
		v1.POST("/removefrombasket", basketRemove)
	}
	router.NoRoute(func(c *gin.Context) {
		notFound(nil, c)
	})
	return nil
}
