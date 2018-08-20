package api_v1

import (
	"github.com/alchster/foodeliver/db"
	//"github.com/appleboy/gin-jwt"
	"github.com/gin-gonic/gin"
	"net/http"
)

func checkPassword(c *gin.Context) {
	var pass struct {
		Password string `json:"password"`
		Hash     string `json:"hash"`
	}
	if err := c.BindJSON(&pass); err != nil {
		badRequest(err, c)
		return
	}
	if !db.CheckPassword(pass.Hash, pass.Password) {
		conflict(nil, c)
		return
	}
	c.JSON(http.StatusOK, errorJSON(http.StatusOK, nil))
}
