package db

import (
	"errors"
	"fmt"
	"time"
)

const MAX_ORDER_NUM = 9999

var NotFound = errors.New("Not found")

type TemporaryOrders struct {
	nodeId       string
	freeOrderNum int
	orders       map[UUID][]*OrderInfo // passengers' lists of orders
	ordersIds    map[UUID]*OrderInfo   // orders index map
}

func (t *TemporaryOrders) Init(nodeId string, lastOrderNum int) {
	t.nodeId = nodeId
	t.freeOrderNum = lastOrderNum // it will be increased later in TemporaryOrders.orderNum()
	t.orders = make(map[UUID][]*OrderInfo)
	t.ordersIds = make(map[UUID]*OrderInfo)
	var baskProds []BasketProduct
	db.Order("created_at").Find(&baskProds)
	for _, bp := range baskProds {
		t.AddProduct(bp.PassengerID, bp.ProductID, bp.StationID, bp.Count)
	}
}

func (t *TemporaryOrders) All(passenger UUID) []*OrderInfo {
	var ok bool
	var ois []*OrderInfo
	if ois, ok = t.orders[passenger]; !ok {
		ois = make([]*OrderInfo, 0)
	}

	return ois
}

func (t *TemporaryOrders) Order(id UUID) (*OrderInfo, error) {
	if oi, ok := t.ordersIds[id]; !ok {
		return nil, NotFound
	} else {
		return oi, nil
	}
}

func (t *TemporaryOrders) IsOwner(id, passenger UUID) bool {
	if order, ok := t.ordersIds[id]; !ok {
		return false
	} else {
		return order.passengerId == passenger
	}
}

func (t *TemporaryOrders) RecalculateAll() {
	// TODO: check need of this method
}

func (t *TemporaryOrders) AddOrderProduct(order *OrderInfo, product UUID, quantity int) error {
	count, err := order.Add(product, quantity)
	if err != nil {
		return err
	}

	if err = db.Exec("INSERT INTO basket_products (passenger_id, product_id, station_id, supplier_id, count) "+
		"VALUES (?, ?, ?, ?, ?) "+
		"ON CONFLICT (passenger_id, product_id, station_id) DO "+
		"UPDATE SET \"count\" = ?",
		order.passengerId, product, order.StationID, order.Supplier.ID, count, count).Error; err != nil {
		return err
	}
	return nil
}

func (t *TemporaryOrders) RemoveOrderProduct(order *OrderInfo, product UUID, quantity int) error {
	count, err := order.Remove(product, quantity)
	if err != nil {
		return err
	}
	if count < 1 {
		err = t.Delete(order.ID)
	} else {
		err = db.Exec("UPDATE basket_products SET count = ? "+
			"WHERE passenger_id = ? and product_id = ? and station_id = ?",
			count, order.passengerId, product, order.StationID).Error
	}
	return err
}

func (t *TemporaryOrders) AddProduct(passenger, product, station UUID, quantity int) error {
	var supplier UUID
	if err := db.Table("products").Where("id = ?", product).Select("supplier_id").Row().
		Scan(&supplier); err != nil {
		return err
	}

	order := t.getOrder(passenger, supplier, station)
	return t.AddOrderProduct(order, product, quantity)
}

func (t *TemporaryOrders) RemoveProduct(passenger, product, station UUID, quantity int) error {
	var supplier UUID
	if err := db.Table("products").Where("id = ?", product).Select("supplier_id").Row().
		Scan(&supplier); err != nil {
		return err
	}

	order := t.getOrder(passenger, supplier, station)
	return t.RemoveOrderProduct(order, product, quantity)
}

func (t *TemporaryOrders) UpdateStation(id, station UUID) error {
	order, err := t.Order(id)
	if err != nil {
		return err
	}
	// TODO: find passenger order with same supplier and station and merge with this one
	oldStation := order.StationID
	order.StationID = station
	for i, _ := range order.Products {
		order.Products[i].StationID = station
	}
	return db.Exec("UPDATE basket_products SET station_id = ? "+
		"WHERE passenger_id = ? and supplier_id = ? and station_id = ?",
		station, order.passengerId, order.Supplier.ID, oldStation).Error
}

func (t *TemporaryOrders) DeleteProduct(id, product UUID) error {
	order, err := t.Order(id)
	if err != nil {
		return err
	}
	order.Delete(product)
	if err := db.Exec("DELETE FROM basket_products "+
		"WHERE passenger_id = ? and product_id = ? and station_id = ?",
		order.passengerId, product, order.StationID).Error; err != nil {
		return err
	}
	if len(order.Products) < 1 {
		return t.Delete(id)
	}
	return nil
}

func (t *TemporaryOrders) Delete(id UUID) error {
	order, err := t.Order(id)
	if err != nil {
		return err
	}
	pass := order.passengerId
	passOrds, ok := t.orders[pass]
	if !ok {
		return NotFound
	}
	delete(t.ordersIds, id)
	for i, ord := range passOrds {
		if ord == order {
			t.orders[pass] = append(passOrds[:i], passOrds[i+1:]...)
			break
		}
	}
	return db.Exec("DELETE FROM basket_products "+
		"WHERE passenger_id = ? and supplier_id = ? and station_id = ?",
		order.passengerId, order.Supplier.ID, order.StationID).Error
}

func (t *TemporaryOrders) DeleteAll(passenger UUID) error {
	if orders, ok := t.orders[passenger]; ok {
		for _, order := range orders {
			delete(t.ordersIds, order.ID)
		}
		t.orders[passenger] = nil
	} else {
		return NotFound
	}
	return db.Exec("DELETE FROM basket_products WHERE passenger_id = ?", passenger).Error
}

func (t *TemporaryOrders) PassengerOrders(passenger UUID) []*OrderInfo {
	if ords, ok := t.orders[passenger]; !ok {
		return make([]*OrderInfo, 0)
	} else {
		return ords
	}
}

// private

func (t *TemporaryOrders) getOrder(passenger, supplier, station UUID) *OrderInfo {
	passOrds, ok := t.orders[passenger]
	if !ok {
		passOrds = make([]*OrderInfo, 0, 1)
		t.orders[passenger] = passOrds
	}

	var orderInfo *OrderInfo
	for _, oi := range passOrds {
		if oi.Supplier.ID == supplier && oi.StationID == station {
			orderInfo = oi
		}
	}
	if orderInfo == nil {
		id := NewID()
		var sup Supplier
		if err := db.Where("id = ?", supplier).First(&sup).Error; err != nil {
			return nil
		}
		var ss SupplierStation
		if err := db.Where("supplier_id = ? and station_id = ?",
			supplier, station).First(&ss).Error; err != nil {
			return nil
		}
		sli := stationsList[stationsMap[station]]
		deadline := sli.Departure.Add(-5 * time.Minute)
		if deadline.Unix() < sli.Arrival.Unix() {
			deadline = sli.Arrival
		}
		orderInfo = &OrderInfo{
			ID:     id,
			Number: t.orderNum(),
			Supplier: BasketSupplierInfo{
				ID:          sup.ID,
				Description: sup.Description,
				Logo:        sup.Photo,
			},
			Products:         make([]*BasketProductInfo, 0, 1),
			StationID:        station,
			passengerId:      passenger,
			minAmount:        ss.MinAmount,
			deliveryDeadline: deadline,
		}
		orderInfo.Init()
		t.orders[passenger] = append(t.orders[passenger], orderInfo)
		t.ordersIds[id] = orderInfo
	}
	return orderInfo
}

func (t *TemporaryOrders) orderNum() string {
	t.freeOrderNum += 1
	return fmt.Sprintf("%s-%04d", t.nodeId, t.freeOrderNum%MAX_ORDER_NUM)
}

func (t *TemporaryOrders) String() string {
	s := "TEMPORARY ORDERS:\n"
	for k, ords := range t.orders {
		s += fmt.Sprintf("  %s:\n", k)
		for _, ord := range ords {
			s += fmt.Sprintf("    %s\n", ord)
		}
	}
	return s
}
