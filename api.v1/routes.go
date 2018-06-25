package api

import (
	"github.com/gin-gonic/gin"
)

func Setup(router gin.IRouter, baseUrl string) {
	v1 := router.Group(baseUrl)
	v1.GET("/ping", ping)
}
