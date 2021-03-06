package db

type SupplierStatus struct {
	Code SupplierStatusCode `json:"code" gorm:"type:smallint;primary_key;default:0"`
	TextReference
	Color string `json:"color" gorm:"-"`
}

type ProductStatus struct {
	Code ProductStatusCode `json:"code" gorm:"type:smallint;primary_key;default:0"`
	TextReference
	Color string `json:"color" gorm:"-"`
}

func (t *TextReference) AfterFind() {
	db.Where("id = ?", t.TextID).First(&t.Status)
}

type OrderStatus struct {
	Code OrderStatusCode `json:"code" gorm:"type:smallint;primary_key;default:0"`
	TextReference
	Color string `json:"color" gorm:"-"`
}

func NewStatus(code interface{}, ru, en, zh string) interface{} {
	switch c := code.(type) {
	case SupplierStatusCode:
		return &SupplierStatus{
			Code: c,
			TextReference: TextReference{
				Status: NewText(ru, en, zh),
			},
		}
	case ProductStatusCode:
		return &ProductStatus{
			Code: c,
			TextReference: TextReference{
				Status: NewText(ru, en, zh),
			},
		}
	case OrderStatusCode:
		return &OrderStatus{
			Code: c,
			TextReference: TextReference{
				Status: NewText(ru, en, zh),
			},
		}
	}
	return nil
}

func createStatuses() error {
	var (
		ss []SupplierStatusCode
		ps []ProductStatusCode
		os []OrderStatusCode
	)
	statuses := map[interface{}]bool{}
	db.Model(&SupplierStatus{}).Pluck("code", &ss)
	db.Model(&ProductStatus{}).Pluck("code", &ps)
	db.Model(&OrderStatus{}).Pluck("code", &os)
	for _, s := range ss {
		statuses[s] = true
	}
	for _, s := range ps {
		statuses[s] = true
	}
	for _, s := range os {
		statuses[s] = true
	}
	for c, s := range statusesList() {
		if _, ok := statuses[c]; !ok {
			if err := db.Create(s).Error; err != nil {
				return err
			}
		}
	}
	return nil
}

func statusesList() map[interface{}]interface{} {
	res := make(map[interface{}]interface{})

	res[SUPPLIER_STATUS_BLOCKED] = NewStatus(SUPPLIER_STATUS_BLOCKED,
		"blocked", "заблокирован", "")
	res[SUPPLIER_STATUS_INACTIVE] = NewStatus(SUPPLIER_STATUS_INACTIVE,
		"not active", "неактивен", "")
	res[SUPPLIER_STATUS_ACTIVE] = NewStatus(SUPPLIER_STATUS_ACTIVE,
		"active", "активен", "")

	res[PRODUCT_STATUS_NEW] = NewStatus(PRODUCT_STATUS_NEW,
		"new", "новый", "")
	res[PRODUCT_STATUS_UNAVAILABLE] = NewStatus(PRODUCT_STATUS_UNAVAILABLE,
		"not available", "недоступно", "")
	res[PRODUCT_STATUS_NOT_APPROVED] = NewStatus(PRODUCT_STATUS_NOT_APPROVED,
		"not approved", "не одобрено", "")
	res[PRODUCT_STATUS_APPROVED] = NewStatus(PRODUCT_STATUS_APPROVED,
		"approved", "одобрено", "")

	res[ORDER_STATUS_DISPUTE] = NewStatus(ORDER_STATUS_DISPUTE,
		"dispute", "диспут", "")
	res[ORDER_STATUS_NOT_DELIVERED] = NewStatus(ORDER_STATUS_NOT_DELIVERED,
		"not delivered to mediator", "не доставлен посреднику", "")
	res[ORDER_STATUS_NOT_ACCEPTED] = NewStatus(ORDER_STATUS_NOT_ACCEPTED,
		"not accepted by supplier", "не принят поставщиком", "")
	res[ORDER_STATUS_NOT_PAID] = NewStatus(ORDER_STATUS_NOT_PAID,
		"not paid", "не оплачен", "")
	res[ORDER_STATUS_NEW] = NewStatus(ORDER_STATUS_NEW,
		"new", "новый", "")
	res[ORDER_STATUS_PAID] = NewStatus(ORDER_STATUS_PAID,
		"paid", "оплачен", "")
	res[ORDER_STATUS_ACCEPTED] = NewStatus(ORDER_STATUS_ACCEPTED,
		"accepted by supplier", "принят поставщиком", "")
	res[ORDER_STATUS_DELIVERED] = NewStatus(ORDER_STATUS_DELIVERED,
		"delivered to mediator", "доставлен посреднику", "")
	res[ORDER_STATUS_FULFILLED] = NewStatus(ORDER_STATUS_FULFILLED,
		"fullfilled", "исполнен", "")

	return res
}

var productStatusColors = map[ProductStatusCode]string{
	PRODUCT_STATUS_NEW:          "#f5a623",
	PRODUCT_STATUS_APPROVED:     "#7ed321",
	PRODUCT_STATUS_UNAVAILABLE:  "#9b9b9b",
	PRODUCT_STATUS_NOT_APPROVED: "#ff0033",
}

var supplierStatusColors = map[SupplierStatusCode]string{
	SUPPLIER_STATUS_BLOCKED:  "#ff0033",
	SUPPLIER_STATUS_INACTIVE: "#9b9b9b",
	SUPPLIER_STATUS_ACTIVE:   "#7ed321",
}

func SupplierStatuses() (statuses []SupplierStatus, err error) {
	err = db.Order("code").Find(&statuses).Error
	for i, _ := range statuses {
		statuses[i].Color = supplierStatusColors[statuses[i].Code]
	}
	return
}

func OrderStatuses() (statuses []OrderStatus, err error) {
	err = db.Order("code").Find(&statuses).Error
	return
}
