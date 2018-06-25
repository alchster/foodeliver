package main

import (
	api_v1 "./api.v1"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	api_v1.Setup(router, "/api/v1")
	router.Run()
}
