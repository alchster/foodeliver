package api_v1

import (
	"github.com/alchster/foodeliver/db"
	"github.com/appleboy/gin-jwt"
	"github.com/gin-gonic/gin"
	"time"
)

var authMiddleware *jwt.GinJWTMiddleware

func newAuthMiddlware(secret string) *jwt.GinJWTMiddleware {
	return &jwt.GinJWTMiddleware{
		Realm:      "Food delivering service API",
		Key:        []byte(secret),
		Timeout:    time.Hour,
		MaxRefresh: 24 * time.Hour,
		Authenticator: func(login, password string, c *gin.Context) (interface{}, bool) {
			user, err := db.CheckLogin(login, password)
			if err != nil {
				return nil, false
			}
			return user, true
		},
		Authorizator: func(user interface{}, c *gin.Context) bool {
			return false
		},
		Unauthorized: func(c *gin.Context, code int, message string) {
			c.JSON(code, h{
				"code":    code,
				"message": message,
			})
		},
		TokenLookup:   "header:Authorization",
		TokenHeadName: "Bearer",
		TimeFunc:      time.Now,
	}
}
