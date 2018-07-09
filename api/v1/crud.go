package api_v1

import (
	"errors"
	"github.com/alchster/foodeliver/db"
	"github.com/gin-gonic/gin"
	_ "github.com/gin-gonic/gin/binding"
	"net/http"
)

func creator(entity_name string) gin.HandlerFunc {
	return func(c *gin.Context) {
		obj, err := db.NewObject(entity_name)
		if err != nil {
			notFound(err, c)
			return
		}
		if err = c.BindJSON(obj); err != nil {
			badRequest(err, c)
			return
		}
		if err = db.Create(obj); err != nil {
			unprocessable(err, c)
			return
		}
		c.JSON(http.StatusCreated, obj)
	}
}

func allReader(entity_name string) gin.HandlerFunc {
	return func(c *gin.Context) {
		obj, err := db.ReadAll(entity_name)
		if err != nil {
			notFound(err, c)
			return
		}
		c.JSON(http.StatusOK, obj)
	}
}

func reader(entity_name string) gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Params.ByName("id")
		obj, err := db.Read(entity_name, id)
		if err != nil {
			notFound(errors.New("Entity '"+entity_name+"' with ID="+id+" not found"), c)
			return
		}
		c.JSON(http.StatusOK, obj)
	}
}

func updater(entity_name string) gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Params.ByName("id")
		obj, err := db.NewObject(entity_name)
		if err != nil {
			notFound(err, c)
			return
		}
		if err = c.BindJSON(obj); err != nil {
			badRequest(err, c)
			return
		}
		if obj, err = db.Update(entity_name, id, obj); err != nil {
			unprocessable(err, c)
			return
		}
		c.JSON(http.StatusOK, obj)
	}
}

func deleter(entity_name string) gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Params.ByName("id")
		if err := db.Delete(entity_name, id); err != nil {
			notFound(errors.New("Entity '"+entity_name+"' with ID="+id+" not found"), c)
			return
		}
		c.JSON(http.StatusOK, errorJSON(http.StatusOK, nil))
	}
}
