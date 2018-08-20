package api_v1

import (
	"github.com/alchster/foodeliver/db"
	"github.com/appleboy/gin-jwt"
	"github.com/gin-gonic/gin"
	"net/http"
)

func ping(c *gin.Context) {
	claims := jwt.ExtractClaims(c)
	if err := db.Ping(); err != nil {
		c.JSON(http.StatusServiceUnavailable,
			errorJSON(http.StatusServiceUnavailable, err))
		return
	}
	c.JSON(http.StatusOK, h{
		"message": "pong",
		"claims":  claims,
	})
}
