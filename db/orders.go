package db

import (
	"github.com/shopspring/decimal"
	"log"
	"time"
)

type Order struct {
	Entity
	Number         string          `json:"number" qorm:"not_null;unique_index"`
	PassengerID    UUID            `json:"passenger_id" sql:"type:uuid REFERENCES passengers(id)"`
	TrainID        UUID            `json:"train_id" gorm:type:"uuid REFERENCES trains(id)"`
	Train          Train           `json:"-" gorm:type:"foreignkey:TrainID;association_foreignkey:ID"`
	StationID      UUID            `json:"-" gorm:type:"uuid REFERENCES stations(id)"`
	Station        Station         `json:"station" gorm:type:"foreignkey:StationID;association_foreignkey:ID"`
	TrainNumber    string          `json:"train_number" gorm:"-"`
	Arrival        time.Time       `json:"arrival" gorm:"type:timestamptz;not_null"`
	Departure      time.Time       `json:"departure" gorm:"type:timestamptz;not_null"`
	DeliverUntil   time.Time       `json:"deliver_until" gorm:"type:timestamptz;not_null"`
	CarNumber      int             `json:"car_number"`
	Seat           int             `json:"seat"`
	PaymentMethod  PaymentType     `json:"payment_method"`
	ChangeBanknote int             `json:"change_banknote"`
	Total          decimal.Decimal `json:"total" gorm:"type:numeric"`
	Charge         decimal.Decimal `json:"charge" gorm:"type:numeric"`
	Status         OrderStatus     `json:"-" gorm:"foreignkey:StatusCode; association_foreignkey:Code"`
	StatusCode     OrderStatusCode `json:"status_code" sql:"type:smallint REFERENCES order_statuses(code)"`
	StatusesList   []OrderStatus   `json:"statuses" gorm:"-"`
	Supplier       Supplier        `json:"-" gorm:"foreignkey:SupplierID;association_foreignkey:ID"`
	SupplierID     UUID            `json:"-" sql:"type:uuid REFERENCES suppliers(id)"`
	Products       []OrderProduct  `json:"products" gorm:"-"`
}

type OrderProduct struct {
	OrderID   UUID    `json:"-" gorm:"type:uuid REFERENCES orders(id);primary_key"`
	ProductID UUID    `json:"-" gorm:"type:uuid REFERENCES products(id);primary_key"`
	Product   Product `json:"product" gorm:"type:"`
	Count     int     `json:"count"`
}

func (op *OrderProduct) AfterFind() {
	db.Where("id = ?", op.ProductID).First(&op.Product)
}

var tmpOrders TemporaryOrders

var supplierOrderStatuses []OrderStatus

var orderStatusColors = map[OrderStatusCode]string{
	ORDER_STATUS_NOT_ACCEPTED: "#ff0033",
	ORDER_STATUS_NEW:          "#ffffff",
	ORDER_STATUS_PAID:         "#f5a623",
	ORDER_STATUS_ACCEPTED:     "#7ed321",
}

var supplierOrderStatusCodes = []OrderStatusCode{
	ORDER_STATUS_NOT_ACCEPTED,
	ORDER_STATUS_NEW,
	ORDER_STATUS_PAID,
	ORDER_STATUS_ACCEPTED,
}

func getSupplierOrderStatuses() []OrderStatus {
	var os []OrderStatus
	db.Order("code").Where("code in (?)", supplierOrderStatusCodes).Find(&os)
	for i, s := range os {
		db.Where("id = ?", s.TextID).First(&os[i].Status)
		os[i].Color = orderStatusColors[s.Code]
	}
	return os
}

func (o *Order) BeforeCreate() {
	if o.ID.IsZero() {
		o.ID = NewID()
	}
}

func (o *Order) AfterFind() {
	db.Where("id = ?", o.TrainID).First(&o.Train)
	db.Where("id = ?", o.StationID).First(&o.Station)
	o.TrainNumber = o.Train.Number
	db.Model(&OrderProduct{}).Where("order_id = ?", o.ID).Find(&o.Products)
	o.StatusesList = supplierOrderStatuses
}

func (o *Order) AfterCreate() {
	if err := db.Where("id = ?", o.SupplierID).First(&o.Supplier).Error; err != nil {
		return
	}
	html, err := mailer.MakeHTML("new_order.template", map[string]interface{}{
		"name":  o.Supplier.Description,
		"order": o.Number,
		"link":  "/orders",
	})
	if err != nil {
		return
	}
	go mailer.Send(o.Supplier.Description, o.Supplier.Email, "Создан заказ №"+o.Number, html)

}

var orderStatusesFilter = []OrderStatusCode{
	ORDER_STATUS_NEW,
	ORDER_STATUS_PAID,
	ORDER_STATUS_ACCEPTED,
	ORDER_STATUS_NOT_ACCEPTED,
}

func SupplierOrders(supId UUID) ([]Order, error) {
	var orders []Order
	if err := db.Order("updated_at desc").Where("supplier_id = ? and status_code in (?)",
		supId, orderStatusesFilter).Find(&orders).Error; err != nil {
		return nil, err
	}
	return orders, nil
}

func UnpaidOrders(passId string) []Order {
	var orders []Order
	pid, err := GetUUID(passId)
	if err != nil {
		log.Print("UnpaidOrders: Invalid ID")
		return make([]Order, 0, 0)
	}
	err = db.Where("passenger_id = ? and status_code = ?", pid, ORDER_STATUS_NEW).Find(&orders).Error
	if err != nil {
		log.Print("UnpaidOrders: Invalid ID")
	}

	return orders
}

func OrderSetPaid(ordId string) error {
	oid, err := GetUUID(ordId)
	if err != nil {
		return err
	}
	return db.Model(&Order{}).Where("id = ?", oid).Update("status_code", ORDER_STATUS_PAID).Error
}

func ClearPassengerTmpOrders(passId string) {
	if psid, err := GetUUID(passId); err == nil {
		tmpOrders.DeleteAll(psid)
	}
}
