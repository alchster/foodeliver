package api

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func ping(c *gin.Context) {
	c.JSON(http.StatusOK, h{
		"message": "pong",
	})
}
