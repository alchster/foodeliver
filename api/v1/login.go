package api_v1

import (
	"github.com/alchster/foodeliver/db"
	"github.com/gin-gonic/gin"
	_ "github.com/gin-gonic/gin/binding"
	"net/http"
)

type loginCreds struct {
	Login    string `json:"login" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func login(c *gin.Context) {
	lc := new(loginCreds)
	if err := c.BindJSON(lc); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, h{
			"error": "json error: " + err.Error(),
		})
		return
	}
	if lc.Login == "" || lc.Password == "" {
		c.AbortWithStatusJSON(http.StatusUnauthorized, h{
			"error": "empty login or password",
		})
		return
	}
	user, err := db.CheckLogin(lc.Login, lc.Password)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusUnauthorized, h{
			"error": "invalid login or password",
		})
	} else {
		c.JSON(http.StatusOK, h{
			"status":  "ok",
			"message": "successfully logged in",
			"user":    user,
		})
	}
}
