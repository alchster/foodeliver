package api_v1

import (
	"errors"
	"fmt"
	"github.com/alchster/foodeliver/db"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
)

type QueryParams struct {
	PassengerID string `form:"passengerID" json:"passengerID"`
	ProductID   string `json:"productID"`
	SupplierID  string `form:"supplierID"`
	StationID   string `form:"stationID"`
}

func (q QueryParams) String() string {
	return fmt.Sprintf("Passenger ID: %s\nProduct ID: %s\nSupplier ID: %s\nStationID: %s\n",
		q.PassengerID, q.ProductID, q.SupplierID, q.StationID)
}

func passengerByFingerprint(c *gin.Context) {
	var q struct {
		Fingerprint string `form:"fingerprint"`
	}
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
	_, sl, err := db.Stations()
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
	if err := db.SetStart(j.Time, trainID); err != nil {
		unprocessable(err, c)
	}
	c.JSON(http.StatusOK, h{"result": "ok"})
}
