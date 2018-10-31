package db

import (
	"errors"
	"fmt"
	"github.com/shopspring/decimal"
	"log"
	"time"
)

var InvalidID = errors.New("Invalid ID")
var TimeNotSet = errors.New("Start time not set")
var InvalidParameter = errors.New("Invalid parameter value")
var InvalidPassenger = errors.New("Invalid passenger")
var InvalidFingerprint = errors.New("Invalid fingerprint")
var InvalidStation = errors.New("Invalid station")
var InvalidCarNumber = errors.New("Invalid train car number")
var InvalidSeatNumber = errors.New("Invalid seat number")
var InvalidPaymentMethod = errors.New("Invalid payment method")
var UnavailablePaymentMethod = errors.New("Payment method is temporary unavailable")
var InvalidChange = errors.New("Invalid change banknote")

//var MinAmountError = errors.New("Total is less than minimal amount for this supplier")
//var TimeoutError = errors.New("Time is out for this supplier at this station")

type BasketInfo struct {
	Orders []OrderInfo     `json:"orders"`
	Total  decimal.Decimal `json:"cost_total"`
	Charge decimal.Decimal `json:"cost_service"`
	Size   int             `json:"size"`
}

type BasketProduct struct {
	PassengerID UUID      `json:"-" gorm:"primary_key"`
	ProductID   UUID      `json:"-" gorm:"primary_key"`
	Product     Product   `json:"product" gorm:"-"`
	SupplierID  UUID      `json:"-"`
	StationID   UUID      `json:"-" gorm:"primary_key"`
	Count       int       `json:"count"`
	CreatedAt   time.Time `json:"-" sql:"type:timestamptz;not null;default:now()"`
}

type BasketProductInfo struct {
	ID          UUID            `json:"id"`
	Name        Text            `json:"name"`
	Description Text            `json:"description"`
	Cost        decimal.Decimal `json:"cost"`
	Count       int             `json:"count"`
	Image       string          `json:"image"`
	StationID   UUID            `json:"-"`
	product     Product         `json:"-"`
}

type BasketSupplierInfo struct {
	ID          UUID                        `json:"id"`
	Description string                      `json:"description"`
	Logo        string                      `json:"logo"`
	Stations    []BasketSupplierStationInfo `json:"stations"`
}

type BasketSupplierStationInfo struct {
	ID           UUID     `json:"id"`
	Name         Text     `json:"name"`
	OrderEndTime TimeResp `json:"order_end_time"`
	Selected     bool     `json:"selected"`
}

func (bp *BasketProduct) AfterFind() error {
	db.Where("id = ?", bp.ProductID).First(&bp.Product)
	return nil
}

func BasketFull(passId string) (*BasketInfo, error) {
	if debugMode {
		log.Printf("BASKET:\n  passengerID: %s\n", passId)
	}
	if startTime.IsZero() {
		return nil, TimeNotSet
	}
	psid, err := GetUUID(passId)
	if err != nil {
		return nil, InvalidID
	}

	var allTotal, allCharge decimal.Decimal
	size := 0

	orders := tmpOrders.All(psid)
	ords := make([]OrderInfo, 0, len(orders))
	for _, ord := range orders {
		order := *ord

		stations := make([]BasketSupplierStationInfo, 0, 1)

		_, sris, err := Stations(order.Supplier.ID.String())
		if err != nil {
			return nil, err
		}
		for _, sri := range sris {
			stations = append(stations, BasketSupplierStationInfo{
				ID:           sri.Station.ID,
				Name:         sri.Station.Name,
				OrderEndTime: TimeResp(sri.Station.OrderDeadline),
				Selected:     sri.Station.ID == order.StationID,
			})
		}
		order.Supplier.Stations = stations

		allTotal = allTotal.Add(order.Total)
		allCharge = allCharge.Add(order.Charge)
		size += order.size
		ords = append(ords, order)
	}

	return &BasketInfo{
		Orders: ords,
		Total:  allTotal,
		Charge: allCharge,
		Size:   size,
	}, nil
}

func AddToBasket(passId, productId, stationId string) error {
	if debugMode {
		log.Printf("ADD TO BASKET:\n  passengerID: %s\n  stationID: %s\n  productID: %s\n\n", passId, stationId, productId)
	}
	if startTime.IsZero() {
		return TimeNotSet
	}
	psid, errPass := GetUUID(passId)
	prid, errProd := GetUUID(productId)
	stid, errStat := GetUUID(stationId)
	if errPass != nil || errProd != nil || errStat != nil {
		return InvalidID
	}
	return tmpOrders.AddProduct(psid, prid, stid, 1)
}

func RemoveFromBasket(passId, productId, stationId string) error {
	if debugMode {
		log.Printf("REMOVE FROM BASKET:\n  passengerID: %s\n  stationID: %s\n  productID: %s\n\n",
			passId, stationId, productId)
	}
	if startTime.IsZero() {
		return TimeNotSet
	}
	psid, errPass := GetUUID(passId)
	prid, errProd := GetUUID(productId)
	stid, errStat := GetUUID(stationId)
	if errPass != nil || errProd != nil || errStat != nil {
		return InvalidID
	}
	return tmpOrders.RemoveProduct(psid, prid, stid, 1)
}

func UpdateItemCount(passId, orderId, productId, count string) error {
	if debugMode {
		log.Printf("UPDATE ITEM COUNT:\n  passengerID: %s\n  orderID: %s\n  productID: %s\n\n",
			passId, orderId, productId)
	}
	if startTime.IsZero() {
		return TimeNotSet
	}
	psid, errPass := GetUUID(passId)
	prid, errProd := GetUUID(productId)
	orid, errOrd := GetUUID(orderId)
	if errPass != nil || errProd != nil || errOrd != nil {
		return InvalidID
	}
	order, err := tmpOrders.Order(orid)
	if err != nil {
		return err
	}
	if !tmpOrders.IsOwner(orid, psid) {
		return InvalidPassenger
	}
	err = InvalidParameter
	if count == "up" {
		err = tmpOrders.AddOrderProduct(order, prid, 1)
	} else if count == "down" {
		err = tmpOrders.RemoveOrderProduct(order, prid, 1)
	}
	return err
}

func UpdateOrderStation(passId, orderId, stationId string) error {
	if debugMode {
		log.Printf("UPDATE ORDER STATION:\n  passengerID: %s\n  orderID: %s\n  stationID: %s\n\n",
			passId, orderId, stationId)
	}
	if startTime.IsZero() {
		return TimeNotSet
	}
	psid, errPass := GetUUID(passId)
	stid, errStat := GetUUID(stationId)
	orid, errOrd := GetUUID(orderId)
	if errPass != nil || errStat != nil || errOrd != nil {
		return InvalidID
	}
	if !tmpOrders.IsOwner(orid, psid) {
		return InvalidPassenger
	}
	return tmpOrders.UpdateStation(orid, stid)
}

func DeleteItem(passId, orderId, productId string) error {
	if debugMode {
		log.Printf("DELETE ITEM:\n  passengerID: %s\n  orderID: %s\n  productID: %s\n\n",
			passId, orderId, productId)
	}
	if startTime.IsZero() {
		return TimeNotSet
	}
	psid, errPass := GetUUID(passId)
	prid, errProd := GetUUID(productId)
	orid, errOrd := GetUUID(orderId)
	if errPass != nil || errProd != nil || errOrd != nil {
		return InvalidID
	}
	if !tmpOrders.IsOwner(orid, psid) {
		return InvalidPassenger
	}
	return tmpOrders.DeleteProduct(orid, prid)
}

func DeleteOrder(passId, orderId string) error {
	if debugMode {
		log.Printf("DELETE ORDER:\n  passengerID: %s\n  orderID: %s\n\n", passId, orderId)
	}
	if startTime.IsZero() {
		return TimeNotSet
	}
	psid, errPass := GetUUID(passId)
	orid, errOrd := GetUUID(orderId)
	if errPass != nil || errOrd != nil {
		return InvalidID
	}
	if !tmpOrders.IsOwner(orid, psid) {
		return InvalidPassenger
	}
	return tmpOrders.Delete(orid)
}

func ClearBasket(passId, fingerprint string) error {
	if debugMode {
		log.Printf("CLEAR CART:\n  passengerID: %s\n\n", passId)
	}
	if startTime.IsZero() {
		return TimeNotSet
	}
	psid, err := GetUUID(passId)
	if err != nil {
		return InvalidID
	}
	var fp string
	if err := db.Raw("SELECT fingerprint FROM passengers WHERE id = ?",
		psid).Row().Scan(&fp); err != nil || fp != fingerprint {
		return InvalidFingerprint
	}
	return tmpOrders.DeleteAll(psid)
}

func ValidateOrders(passId string) error {
	if debugMode {
		log.Printf("VALIDATE ORDERS:\n  passengerID: %s\n\n", passId)
	}
	if startTime.IsZero() {
		return TimeNotSet
	}
	psid, err := GetUUID(passId)
	if err != nil {
		return InvalidID
	}
	for _, order := range tmpOrders.PassengerOrders(psid) {
		if order.Total.LessThan(order.minAmount) {
			//return MinAmountError
			return fmt.Errorf(`МИНИМАЛЬНАЯ СУММА ЗАКАЗА У ПОСТАВЩИКА &laquo;%s&raquo; `+
				`%s РУБЛЕЙ, ДОБАВЬТЕ ТОВАРЫ В КОРЗИНУ ДО МИНИМАЛЬНОЙ СУММЫ `+
				`ИЛИ <a href="#" class="delete-order" order-id="%s">ОТМЕНИТЕ ЗАКАЗ</a>`,
				order.Supplier.Description, order.minAmount, order.ID)
		}
		if time.Now().Unix() > stationSupplierDeadline(order.StationID, order.Supplier.ID).Unix() {
			//return TimeoutError
			return fmt.Errorf(`ЗАКОНЧИЛОСЬ ВРЕМЯ ДОСТАВКИ У ПОСТАВЩИКА &laquo;%s&raquo;.`+
				` <a href="#" class="delete-order" order-id="%s">ОЧИСТИТЕ ЭТОТ ЗАКАЗ</a> `+
				`ИЛИ ИЗМЕНИТЕ СТАНЦИЮ ДОСТАВКИ`, order.Supplier.Description, order.ID)
		}
	}
	return nil
}

type OrderParameters struct {
	CarNumber      int    `json:"car_number,omitempty"`
	SeatNumber     int    `json:"seat_number,omitempty"`
	PaymentMethod  string `json:"payment_method,omitempty"`
	ChangeBanknote int    `json:"change_banknote,omitempty"`
}

func CreateOrders(passId, fingerprint string, params *OrderParameters) error {
	if debugMode {
		log.Printf("CREATE ORDERS:\n  passengerID: %s\n\n", passId)
	}
	psid, err := GetUUID(passId)
	if err != nil {
		return InvalidID
	}
	var fp string
	if err := db.Raw("SELECT fingerprint FROM passengers WHERE id = ?",
		psid).Row().Scan(&fp); err != nil || fp != fingerprint {
		return InvalidFingerprint
	}
	if err := ValidateOrders(passId); err != nil {
		return err
	}
	if params.CarNumber < 1 {
		return InvalidCarNumber
	}
	if params.SeatNumber < 1 {
		return InvalidSeatNumber
	}

	var pm PaymentType
	switch params.PaymentMethod {
	case "cash":
		if !service.Cash {
			return UnavailablePaymentMethod
		}
		if _, ok := banknotes[params.ChangeBanknote]; params.ChangeBanknote != 0 && !ok {
			return InvalidChange
		}
		pm = CASH
	case "card_agent":
		if !service.PlasticOffline {
			return UnavailablePaymentMethod
		}
		pm = PLASTIC_OFFLINE
	case "card_online":
		if !service.PlasticOnline {
			return UnavailablePaymentMethod
		}
		pm = PLASTIC_ONLINE
	}

	for _, order := range tmpOrders.PassengerOrders(psid) {
		station := stationsList[stationsMap[order.StationID]]
		orderId := NewID()
		if err := db.Save(&Order{
			Entity:         Entity{ID: orderId},
			Number:         order.Number,
			PassengerID:    psid,
			TrainID:        trainID,
			StationID:      order.StationID,
			Arrival:        station.Arrival,
			Departure:      station.Departure,
			DeliverUntil:   order.deliveryDeadline,
			CarNumber:      params.CarNumber,
			Seat:           params.SeatNumber,
			PaymentMethod:  pm,
			ChangeBanknote: params.ChangeBanknote,
			Total:          order.Total,
			Charge:         order.Charge,
			StatusCode:     ORDER_STATUS_NEW,
			SupplierID:     order.Supplier.ID,
		}).Error; err != nil {
			return err
		}
		for _, prod := range order.Products {
			if err := db.Save(&OrderProduct{
				OrderID:   orderId,
				ProductID: prod.ID,
				Count:     prod.Count,
			}).Error; err != nil {
				return err
			}
		}
	}

	return nil
}
