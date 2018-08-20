package api_v1

import (
	"github.com/alchster/foodeliver/db"
	"github.com/appleboy/gin-jwt"
	"github.com/gin-gonic/gin"
)

func me(c *gin.Context) {
	claims := jwt.ExtractClaims(c)
	t := "user"
	if claims["type"] == "supplier" {
		t = "supplier"
	}
	user, err := db.Read(t, claims["user_id"].(string), claims["user_id"].(string))
	if err != nil {
		notFound(err, c)
		return
	}
	c.JSON(200, h{
		"claims": claims,
		"user":   user,
	})
}
