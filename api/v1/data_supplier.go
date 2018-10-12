package api_v1

import (
	"fmt"
	"github.com/alchster/foodeliver/db"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
)

func supplierDataOrders(supplierId db.UUID) []db.Order {
	orders, err := db.SupplierOrders(supplierId)
	if err != nil {
		orders = make([]db.Order, 0)
	}
	return orders
}

func supplierDataProducts(supplierId db.UUID) map[string]interface{} {
	data := make(map[string]interface{})
	data["products"], _ = db.SupplierCatalogProducts(supplierId)
	data["categories"], _ = db.Categories()
	return data
}

func supplierDataDelivery(supplierId db.UUID) map[string]interface{} {
	stations, err := db.GetSupplierStations(supplierId)
	if err != nil {
		stations = make([]db.StationDeliveryResp, 0)
	}
	data := make(map[string]interface{})
	data["stations"] = stations
	log.Print(stations)
	data["timeList"] = timeList()
	return data
}

func addSupplierStation(c *gin.Context) {
	uid, permErr := extractClaimsWithCheckPerm("supstation", CREATE, c)
	if permErr != nil {
		forbidden(permErr, c)
		return
	}
	userId, err := db.GetUUID(uid)
	if err != nil {
		badRequest(err, c)
		return
	}
	var sd db.StationDeliveryResp
	if err := c.BindJSON(&sd); err != nil {
		badRequest(err, c)
		return
	}
	log.Print(sd)
	if err := db.AddSupplierStation(userId, &sd); err != nil {
		unprocessable(err, c)
		return
	}
	c.JSON(http.StatusOK, h{"status": "ok"})
}

func deleteSupplierStation(c *gin.Context) {
	uid, permErr := extractClaimsWithCheckPerm("supstation", DELETE, c)
	if permErr != nil {
		forbidden(permErr, c)
		return
	}
	userId, err := db.GetUUID(uid)
	if err != nil {
		badRequest(err, c)
		return
	}
	var sd db.StationDeliveryResp
	if err = c.BindJSON(&sd); err != nil {
		badRequest(err, c)
		return
	}
	if err = db.DeleteSupplierStation(userId, &sd); err != nil {
		unprocessable(err, c)
		return
	}
	c.JSON(http.StatusOK, h{"status": "ok"})
}

func timeList() []string {
	l := make([]string, 0, 49)
	for i := 0; i <= 48; i++ {
		h := i / 2
		m := 30 * (i & 1)
		l = append(l, fmt.Sprintf("%02d:%02d", h, m))
	}
	return l
}
