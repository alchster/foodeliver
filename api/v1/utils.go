package api_v1

import (
	"errors"
	"fmt"
	"github.com/alchster/foodeliver/db"
	//"github.com/appleboy/gin-jwt"
	"github.com/gin-gonic/gin"
	"net/http"
)

var PasswordNotMatch = errors.New("Password not match")

func checkPassword(c *gin.Context) {
	var pass struct {
		Password string `json:"password"`
		ID       string `json:"id"`
		Type     string `json:"type"`
	}
	if err := c.BindJSON(&pass); err != nil {
		badRequest(err, c)
		return
	}
	var hash struct {
		Password string
	}
	query := fmt.Sprintf("SELECT password FROM %ss WHERE id = '%s'", pass.Type, pass.ID)
	if err := db.Raw(query).Scan(&hash).Error; err != nil {
		badRequest(err, c)
		return
	}
	if !db.CheckPassword(hash.Password, pass.Password) {
		conflict(nil, c)
		return
	}
	c.JSON(http.StatusOK, errorJSON(http.StatusOK, nil))
}
