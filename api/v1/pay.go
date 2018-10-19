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
		"base":      baseURL,
		"data":      orders,
		"passenger": passId,
	})
}

func pay(c *gin.Context) {
	c.Request.ParseForm()
	if orders, ok := c.Request.PostForm["orders"]; ok {
		for _, o := range orders {
			db.OrderSetPaid(o)
		}
		if passId, ok := c.Request.PostForm["passenger"]; ok {
			db.ClearPassengerTmpOrders(passId[0])
		}
	}
	c.Redirect(http.StatusFound, "/basket.html?orders_paid=yes")
}
