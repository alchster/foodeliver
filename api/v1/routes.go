package api_v1

import (
	"github.com/alchster/foodeliver/db"
	"github.com/alchster/foodeliver/storage"
	"github.com/gin-gonic/gin"
)

var trainID db.UUID
var nodeID string
var baseURL string

func Setup(router *gin.Engine, baseUrl string, train string, node string, store storage.Storage) error {
	v1 := router.Group(baseUrl)
	baseURL = baseUrl
	if train == "" {
		authMiddleware = newAuthMiddlware("hello")
		if err := setupTemplates(router, "/"); err != nil {
			return err
		}
		v1.Use(authMiddleware.MiddlewareFunc())
		v1.GET("/me", me)
		v1.GET("/ping", ping)
		v1.GET("/refresh_token", authMiddleware.RefreshHandler)
		v1.POST("/check_password", checkPassword)
		for _, entity := range db.EntitiesList {
			update := updater(entity)
			v1.GET("/"+entity, allReader(entity))
			v1.POST("/"+entity, creator(entity))
			v1.GET("/"+entity+"/:id", reader(entity))
			v1.PUT("/"+entity, notAllowed)
			v1.PUT("/"+entity+"/:id", update)
			v1.PATCH("/"+entity, notAllowed)
			v1.PATCH("/"+entity+"/:id", update)
			v1.DELETE("/"+entity, notAllowed)
			v1.DELETE("/"+entity+"/:id", deleter(entity))
		}
		v1.POST("/modsupplier", addModerSupplier)
		v1.DELETE("/modsupplier", deleteModerSupplier)
		v1.POST("/supstation", addSupplierStation)
		v1.DELETE("/supstation", deleteSupplierStation)
		v1.GET("/getstat", getStat)
	} else {
		var err error
		trainID, err = db.TrainID(train)
		if err != nil {
			return err
		}
		nodeID = node
		router.LoadHTMLFiles("templ/payment.template")
		v1.POST("/service/start_time", setStartTime)
		v1.GET("/service/start", startTrain)
		v1.GET("/stations", stationsList)
		v1.GET("/suppliers", suppliersList)
		v1.GET("/products", supplierProducts)
		v1.GET("/get_passenger_id", passengerByFingerprint)
		v1.GET("/basket", basket)
		v1.POST("/addtobasket", basketAdd)
		v1.POST("/removefrombasket", basketRemove)
		v1.POST("/update_item_count", updateItemCount)
		v1.POST("/update_order_station", updateItemStation)
		v1.POST("/delete_item", deleteItem)
		v1.POST("/delete_order", deleteOrder)
		v1.POST("/clear_cart", clearBasket)
		v1.GET("/payment_methods", paymentMethods)
		v1.GET("/validate_orders", validateOrders)
		v1.POST("/create_orders", createOrders)
		v1.GET("/payment/:id", payment)
		v1.POST("/pay", pay)
	}
	setupStorage(router, "/files", store)
	router.NoRoute(func(c *gin.Context) {
		notFound(nil, c)
	})
	return nil
}
