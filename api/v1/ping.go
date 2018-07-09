package api_v1

import (
	"github.com/appleboy/gin-jwt"
	"github.com/gin-gonic/gin"
	"net/http"
)

func ping(c *gin.Context) {
	claims := jwt.ExtractClaims(c)
	c.JSON(http.StatusOK, h{
		"message": "pong",
		"user":    claims["id"],
	})
}
