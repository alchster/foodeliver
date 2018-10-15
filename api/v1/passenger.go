package api_v1

import (
	"errors"
	"fmt"
	"github.com/alchster/foodeliver/db"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"time"
)

type QueryParams struct {
	PassengerID string `form:"passengerID" json:"passengerID,omitempty"`
	OrderID     string `form:"orderID" json:"orderID,omitempty"`
	ProductID   string `form:"productID" json:"productID,omitempty"`
	SupplierID  string `form:"supplierID" json:"supplierID,omitempty"`
	StationID   string `form:"stationID" json:"stationID,omitempty"`
	Count       string `form:"count" json:"count,omitempty"`
	Fingerprint string `form:"fingerprint" json:"fingerprint,omitempty"`
	db.OrderParameters
}

func (q QueryParams) String() string {
	return fmt.Sprintf("Passenger ID: %s\nProduct ID: %s\nSupplier ID: %s\nStationID: %s\n",
		q.PassengerID, q.ProductID, q.SupplierID, q.StationID)
}

func passengerByFingerprint(c *gin.Context) {
	var q QueryParams
	if err := c.Bind(&q); err != nil {
		badRequest(err, c)
		return
	}
	if q.Fingerprint == "" {
		badRequest(errors.New("Missing fingerprint"), c)
	}
	p, err := db.PassengerByFingerprint(q.Fingerprint)
	if err != nil {
		unprocessable(err, c)
		return
	}
	c.JSON(http.StatusOK, h{"passengerId": p.ID})
}

func basket(c *gin.Context) {
	var q QueryParams
	if err := c.Bind(&q); err != nil {
		badRequest(err, c)
		return
	}
	basket, err := db.BasketFull(q.PassengerID)
	if err != nil {
		unprocessable(err, c)
		return
	}
	c.JSON(http.StatusOK, basket)
}

func basketAdd(c *gin.Context) {
	var q QueryParams
	if err := c.BindJSON(&q); err != nil {
		badRequest(err, c)
		return
	}
	log.Print(q)
	if err := db.AddToBasket(q.PassengerID, q.ProductID, q.StationID); err != nil {
		unprocessable(err, c)
		return
	}
	c.JSON(http.StatusOK, h{
		"detail": "successfully added",
	})
}

func basketRemove(c *gin.Context) {
	var q QueryParams
	if err := c.BindJSON(&q); err != nil {
		badRequest(err, c)
		return
	}
	if err := db.RemoveFromBasket(q.PassengerID, q.ProductID, q.StationID); err != nil {
		unprocessable(err, c)
		return
	}
	c.JSON(http.StatusOK, h{
		"detail": "successfully removed",
	})
}

func stationsList(c *gin.Context) {
	var q QueryParams
	if err := c.Bind(&q); err != nil {
		badRequest(err, c)
		return
	}
	_, sl, err := db.Stations(q.SupplierID)
	if err != nil {
		badRequest(err, c)
		return
	}
	c.JSON(http.StatusOK, h{
		"stations": sl,
		"size":     len(sl),
	})
}

func suppliersList(c *gin.Context) {
	sl, err := db.SuppliersOnPath()
	if err != nil {
		unprocessable(err, c)
		return
	}
	c.JSON(http.StatusOK, h{
		"suppliers": sl,
		"size":      len(sl),
	})
}

func supplierProducts(c *gin.Context) {
	var q QueryParams
	c.Bind(&q)
	sp, err := db.SupplierProducts(q.SupplierID)
	if err != nil {
		badRequest(err, c)
		return
	}
	c.JSON(http.StatusOK, sp)
}

func setStartTime(c *gin.Context) {
	var j struct {
		Time string `json:"time,required"`
	}
	if err := c.BindJSON(&j); err != nil {
		badRequest(err, c)
		return
	}
	if err := db.SetStart(j.Time, trainID, nodeID); err != nil {
		unprocessable(err, c)
	}
	c.JSON(http.StatusOK, h{"result": "ok"})
}

func startTrain(c *gin.Context) {
	tm := time.Now()
	if err := db.SetStart(tm.Format(time.RFC3339), trainID, nodeID); err != nil {
		unprocessable(err, c)
	}
	c.JSON(http.StatusOK, h{"result": "ok"})
}

func updateItemCount(c *gin.Context) {
	var q QueryParams
	if err := c.Bind(&q); err != nil {
		badRequest(err, c)
		return
	}
	if err := db.UpdateItemCount(q.PassengerID, q.OrderID, q.ProductID, q.Count); err != nil {
		unprocessable(err, c)
		return
	}
	c.JSON(http.StatusOK, h{"result": "ok"})
}

func updateItemStation(c *gin.Context) {
	var q QueryParams
	if err := c.Bind(&q); err != nil {
		badRequest(err, c)
		return
	}
	if err := db.UpdateOrderStation(q.PassengerID, q.OrderID, q.StationID); err != nil {
		unprocessable(err, c)
		return
	}
	c.JSON(http.StatusOK, h{"result": "ok"})
}

func deleteItem(c *gin.Context) {
	var q QueryParams
	if err := c.Bind(&q); err != nil {
		badRequest(err, c)
		return
	}
	if err := db.DeleteItem(q.PassengerID, q.OrderID, q.ProductID); err != nil {
		unprocessable(err, c)
		return
	}
	c.JSON(http.StatusOK, h{"result": "ok"})
}

func deleteOrder(c *gin.Context) {
	var q QueryParams
	if err := c.Bind(&q); err != nil {
		badRequest(err, c)
		return
	}
	if err := db.DeleteOrder(q.PassengerID, q.OrderID); err != nil {
		unprocessable(err, c)
		return
	}
	c.JSON(http.StatusOK, h{"result": "ok"})
}

func clearBasket(c *gin.Context) {
	var q QueryParams
	if err := c.Bind(&q); err != nil {
		badRequest(err, c)
		return
	}
	if err := db.ClearBasket(q.PassengerID, q.Fingerprint); err != nil {
		unprocessable(err, c)
		return
	}
	c.JSON(http.StatusOK, h{"result": "ok"})
}

func paymentMethods(c *gin.Context) {
	pm, err := db.PaymentMethods()
	if err != nil {
		unprocessable(err, c)
		return
	}
	c.JSON(http.StatusOK, pm)
}

func validateOrders(c *gin.Context) {
	var q QueryParams
	if err := c.Bind(&q); err != nil {
		badRequest(err, c)
		return
	}
	if err := db.ValidateOrders(q.PassengerID); err != nil {
		c.JSON(http.StatusOK, h{
			"result": "error",
			"error":  err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, h{"result": "ok"})
}

func createOrders(c *gin.Context) {
	var q QueryParams
	if err := c.BindJSON(&q); err != nil {
		badRequest(err, c)
		return
	}
	if err := db.CreateOrders(q.PassengerID, q.Fingerprint, &q.OrderParameters); err != nil {
		c.JSON(http.StatusOK, h{
			"result": "error",
			"error":  err.Error(),
		})
	}
	c.JSON(http.StatusOK, h{"result": "ok"})
}
