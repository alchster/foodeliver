package api_v1

import (
	"github.com/alchster/foodeliver/db"
	"github.com/appleboy/gin-jwt"
	"github.com/gin-gonic/gin"
	"time"
)

const TOKEN_EXPIRE_MINUTES = 60

var authMiddleware *jwt.GinJWTMiddleware

func newAuthMiddlware(secret string) *jwt.GinJWTMiddleware {
	return &jwt.GinJWTMiddleware{
		Realm:      "Food delivering service API",
		Key:        []byte(secret),
		Timeout:    TOKEN_EXPIRE_MINUTES * time.Minute,
		MaxRefresh: TOKEN_EXPIRE_MINUTES * time.Minute, // user can refresh token after its expiration
		Authenticator: func(login, password string, c *gin.Context) (interface{}, bool) {
			user, err := db.CheckLogin(login, password)
			if err != nil {
				return nil, false
			}
			return user, true
		},
		Authorizator: func(user interface{}, c *gin.Context) bool {
			return true
		},
		Unauthorized: func(c *gin.Context, code int, message string) {
			c.JSON(code, h{
				"code":    code,
				"message": message,
			})
		},
		PayloadFunc: func(user interface{}) jwt.MapClaims {
			res := make(jwt.MapClaims)
			switch u := user.(type) {
			case *db.User:
				if u.Admin {
					res["type"] = "administrator"
				} else {
					res["type"] = "moderator"
				}
				res["user_id"] = u.ID
			case *db.Supplier:
				res["type"] = "supplier"
				res["user_id"] = u.ID
			}
			return res
		},
		TokenLookup:   "header:Authorization",
		TokenHeadName: "Bearer",
		TimeFunc:      time.Now,
	}
}
