package api_v1

import (
	"errors"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)

func notFound(err error, c *gin.Context) {
	c.AbortWithStatusJSON(http.StatusNotFound,
		errorJSON(http.StatusNotFound, err))
}

func badRequest(err error, c *gin.Context) {
	c.AbortWithStatusJSON(http.StatusBadRequest,
		errorJSON(http.StatusBadRequest, err))
}

func conflict(err error, c *gin.Context) {
	c.AbortWithStatusJSON(http.StatusConflict,
		errorJSON(http.StatusConflict, err))
}

func unprocessable(err error, c *gin.Context) {
	c.AbortWithStatusJSON(http.StatusUnprocessableEntity,
		errorJSON(http.StatusUnprocessableEntity, err))
}

func forbidden(err error, c *gin.Context) {
	c.AbortWithStatusJSON(http.StatusForbidden,
		errorJSON(http.StatusForbidden, err))
}

func notAllowed(c *gin.Context) {
	c.AbortWithStatusJSON(http.StatusMethodNotAllowed,
		errorJSON(http.StatusMethodNotAllowed,
			errors.New("Method "+c.Request.Method+" is not allowed for '"+c.Request.URL.Path+"'")))
}

func errorJSON(code int, err error) gin.H {
	h := gin.H{
		"status": strconv.Itoa(code),
	}
	if err != nil {
		h["detail"] = err.Error()
	}
	return h
}
