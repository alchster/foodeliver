package api

import (
	"github.com/gin-gonic/gin"
)

type h gin.H
type actionFunc func(*gin.Context)

type Route struct {
	Path   string
	Method string
	Action actionFunc
}
