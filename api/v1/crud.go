package api_v1

import (
	"errors"
	"fmt"
	"github.com/alchster/foodeliver/db"
	"github.com/appleboy/gin-jwt"
	"github.com/gin-gonic/gin"
	_ "github.com/gin-gonic/gin/binding"
	"net/http"
)

type ErrorForbidden struct {
	user   string
	role   string
	method string
	entity string
}

func (f ErrorForbidden) Error() string {
	return fmt.Sprintf(
		"User '%s' (role: '%s') has no permission to %s entity '%s'",
		f.user,
		f.role,
		f.method,
		f.entity,
	)
}

func creator(entityName string) gin.HandlerFunc {
	return func(c *gin.Context) {
		userId, permErr := extractClaimsWithCheckPerm(entityName, CREATE, c)
		if permErr != nil {
			forbidden(permErr, c)
			return
		}
		obj, err := db.NewObject(entityName)
		if err != nil {
			notFound(err, c)
			return
		}
		if err = c.BindJSON(obj); err != nil {
			badRequest(err, c)
			return
		}
		if err := db.Create(obj, userId); err != nil {
			unprocessable(err, c)
			return
		}
		c.JSON(http.StatusCreated, obj)
	}
}

func allReader(entityName string) gin.HandlerFunc {
	return func(c *gin.Context) {
		userId, permErr := extractClaimsWithCheckPerm(entityName, READ, c)
		if permErr != nil {
			forbidden(permErr, c)
			return
		}
		obj, err := db.ReadAll(entityName, userId)
		if err != nil {
			notFound(err, c)
			return
		}
		c.JSON(http.StatusOK, struct {
			Entities interface{} `json:"entities"`
		}{obj})
	}
}

func reader(entityName string) gin.HandlerFunc {
	return func(c *gin.Context) {
		userId, permErr := extractClaimsWithCheckPerm(entityName, READ, c)
		if permErr != nil {
			forbidden(permErr, c)
			return
		}
		id := c.Params.ByName("id")
		obj, err := db.Read(entityName, id, userId)
		if err != nil {
			notFound(errors.New("Entity '"+entityName+"' with ID="+id+" not found"), c)
			return
		}
		c.JSON(http.StatusOK, obj)
	}
}

func updater(entityName string) gin.HandlerFunc {
	return func(c *gin.Context) {
		userId, permErr := extractClaimsWithCheckPerm(entityName, UPDATE, c)
		if permErr != nil {
			forbidden(permErr, c)
			return
		}
		id := c.Params.ByName("id")
		data := make(map[string]interface{})
		if err := c.BindJSON(&data); err != nil {
			unprocessable(err, c)
			return
		}
		if err := db.Update(entityName, id, data, userId); err != nil {
			unprocessable(err, c)
			return
		}
		c.JSON(http.StatusOK, nil)
	}
}

func deleter(entityName string) gin.HandlerFunc {
	return func(c *gin.Context) {
		userId, permErr := extractClaimsWithCheckPerm(entityName, DELETE, c)
		if permErr != nil {
			forbidden(permErr, c)
			return
		}
		id := c.Params.ByName("id")
		if err := db.Delete(entityName, id, userId); err != nil {
			notFound(errors.New("Entity '"+entityName+"' with ID="+id+" not found"), c)
			return
		}
		c.JSON(http.StatusOK, errorJSON(http.StatusOK,
			errors.New("Entity '"+entityName+"' with ID="+id+" successfully deleted")))
	}
}

var texts = map[permissions]string{
	CREATE: "create",
	READ:   "read",
	UPDATE: "update",
	DELETE: "delete",
}

func extractClaimsWithCheckPerm(entityName string, perm permissions, c *gin.Context) (string, error) {
	claims := jwt.ExtractClaims(c)
	if !hasPermission(claims["type"].(string), entityName, perm) {
		return "", ErrorForbidden{
			claims["id"].(string),
			claims["type"].(string),
			texts[perm],
			entityName,
		}
	}
	return claims["user_id"].(string), nil
}
