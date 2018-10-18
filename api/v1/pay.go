package api_v1

import (
	"github.com/alchster/foodeliver/db"
	"github.com/gin-gonic/gin"
	"net/http"
)

func payment(c *gin.Context) {
	passId := c.Params.ByName("id")
	orders := db.UnpaidOrders(passId)

	c.HTML(http.StatusOK, "payment.template", h{
		"base": baseURL,
		"data": orders,
	})
}

func pay(c *gin.Context) {
	c.Request.ParseForm()
	if orders, ok := c.Request.PostForm["orders"]; ok {
		for _, o := range orders {
			db.OrderSetPaid(o)
		}
	}
	c.Redirect(http.StatusFound, "/basket?orders_paid=yes")
}
