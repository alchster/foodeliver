package api_v1

import (
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

func supplierDataDelivery(supplierId db.UUID) []db.StationDeliveryResp {
	stations, err := db.GetSupplierStations(supplierId)
	if err != nil {
		stations = make([]db.StationDeliveryResp, 0)
	}
	return stations
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
