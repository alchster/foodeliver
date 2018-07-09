package api_v1

import (
	"github.com/alchster/foodeliver/db"
	"github.com/gin-gonic/gin"
)

func Setup(router *gin.Engine, baseUrl string) {
	authMiddleware = newAuthMiddlware("hello")
	v1 := router.Group(baseUrl)
	v1.GET("/ping", ping)
	v1.POST("/login", authMiddleware.LoginHandler)
	v1.GET("/refresh_token", authMiddleware.RefreshHandler)
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
	router.NoRoute(func(c *gin.Context) {
		notFound(nil, c)
	})
}
