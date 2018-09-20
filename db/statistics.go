package db

import (
	"github.com/shopspring/decimal"
	"strings"
	"time"
)

func monthStart(tm time.Time) time.Time {
	y, m, _ := tm.Date()
	return time.Date(y, m, 1, 0, 0, 0, 0, tm.Location())
}

func Stats() map[string]interface{} {
	now := time.Now()
	tp := TimePeriod{monthStart(now), now}
	stats := map[string]interface{}{
		"products":   productsStats(),
		"passengers": passengersStats(tp),
		"trains": map[string]interface{}{
			"ok": trainsAvailStats(tp),
			"na": trainsNAStats(tp),
		},
		"orders": ordersStats(tp),
	}
	return stats
}

type CategoryStats struct {
	ID       UUID
	Category string
	Count    int
}

func productsStats() map[string]interface{} {
	var total int
	db.Model(&Product{}).Count(&total)
	var cs []CategoryStats
	db.Raw("SELECT texts.id as id, ru as category, count(*) FROM products " +
		"JOIN texts ON category_id = texts.id GROUP BY texts.id,ru ORDER BY ru").Scan(&cs)

	return map[string]interface{}{
		"total":      total,
		"categories": cs,
	}
}

func GetStats(sType string, start, end time.Time) (interface{}, error) {
	tp := TimePeriod{start, end}
	switch sType {
	case "passengers":
		return passengersStats(tp), nil
	case "oktrains":
		return trainsAvailStats(tp), nil
	case "natrains":
		return trainsNAStats(tp), nil
	case "orders":
		return ordersStats(tp), nil
	}
	return nil, nil
}

func passengersStats(tp TimePeriod) StatsInfo {
	return StatsInfo{
		Total:    passengersCount(TimePeriod{}),
		Period:   tp,
		AtPeriod: passengersCount(tp),
	}
}

func trainsAvailStats(tp TimePeriod) StatsInfo {
	return StatsInfo{
		Total:    trainsAvailCount(TimePeriod{}),
		Period:   tp,
		AtPeriod: trainsAvailCount(tp),
	}
}

func trainsNAStats(tp TimePeriod) StatsInfo {
	return StatsInfo{
		Total:    trainsNACount(TimePeriod{}),
		Period:   tp,
		AtPeriod: trainsNACount(tp),
	}
}

type OrdersStatsInfo struct {
	Summary   StatsInfo            `json:"summary"`
	Suppliers []SupplierOrdersInfo `json:"suppliers"`
}

func ordersStats(tp TimePeriod) OrdersStatsInfo {
	var sups []Supplier
	db.Table("suppliers").Order("description").Find(&sups)
	supOrdInfos := make([]SupplierOrdersInfo, 0, len(sups))
	for _, s := range sups {
		supOrdInfos = append(supOrdInfos, ordersInfo(&s, tp))
	}

	return OrdersStatsInfo{
		Summary: StatsInfo{
			Total:    ordersTotalCount(TimePeriod{}),
			Period:   tp,
			AtPeriod: ordersTotalCount(tp),
		},
		Suppliers: supOrdInfos,
	}
}

type TimePeriod struct {
	Start time.Time
	End   time.Time
}

func (tp *TimePeriod) FixEnd() {
	if tp.End.IsZero() {
		(*tp).End = time.Now()
	}
}

type StatsInfo struct {
	Total    int        `json:"total"`
	Period   TimePeriod `json:"period"`
	AtPeriod int        `json:"at_period"`
}

func passengersCount(tp TimePeriod) int {
	(&tp).FixEnd()
	var total int
	db.Model(&Passenger{}).Where("updated_at BETWEEN ? AND ?", tp.Start, tp.End).Count(&total)
	return total
}

func trainsAvailCount(tp TimePeriod) int {
	(&tp).FixEnd()
	var total int
	db.Model(&Train{}).Where("active AND updated_at BETWEEN ? AND ?", tp.Start, tp.End).Count(&total)
	return total
}

func trainsNACount(tp TimePeriod) int {
	(&tp).FixEnd()
	var total int
	db.Model(&Train{}).Where("NOT active AND updated_at BETWEEN ? AND ?", tp.Start, tp.End).Count(&total)
	return total
}

func ordersTotalCount(tp TimePeriod) int {
	(&tp).FixEnd()
	var total int
	db.Model(&Order{}).Where("updated_at BETWEEN ? AND ?", tp.Start, tp.End).Count(&total)
	return total
}

type StatusOrdersInfo struct {
	Text  string    `json:"text"`
	Stats StatsInfo `json:"stats"`
}

type SupplierOrdersInfo struct {
	ID             UUID                        `json:"id"`
	Name           string                      `json:"name"`
	SupplierInfo   Supplier                    `json:"supplier"`
	Summary        StatsInfo                   `json:"summary"`
	ByStatus       map[string]StatusOrdersInfo `json:"by_status"`
	SumTotal       decimal.Decimal             `json:"sum_total"`
	SumAtPeriod    decimal.Decimal             `json:"sum_at_period"`
	ChargeTotal    decimal.Decimal             `json:"charge_total"`
	ChargeAtPeriod decimal.Decimal             `json:"charge_at_period"`
}

func ordersInfo(s *Supplier, tp TimePeriod) SupplierOrdersInfo {
	(&tp).FixEnd()
	id := s.ID
	name := s.Description
	var total, atPeriod int
	db.Model(&Order{}).Where("supplier_id = ?", id).Count(&total)
	db.Model(&Order{}).Where("supplier_id = ? AND updated_at BETWEEN ? AND ?", id, tp.Start, tp.End).
		Count(&atPeriod)

	var sumTotal, sumAtPeriod, chargeTotal, chargeAtPeriod decimal.Decimal
	row := db.Model(&Order{}).Where("supplier_id = ? AND status_code = ?", id, ORDER_STATUS_FULFILLED).
		Select("sum(total), sum(charge)").Row()
	row.Scan(&sumTotal, &chargeTotal)
	row = db.Model(&Order{}).Where("supplier_id = ? AND status_code = ? AND updated_at BETWEEN ? AND ?",
		id, ORDER_STATUS_FULFILLED, tp.Start, tp.End).Select("sum(total), sum(charge)").Row()
	row.Scan(&sumAtPeriod, &chargeAtPeriod)

	var statuses []OrderStatus
	db.Order("code").Find(&statuses)

	sOrdInfo := make(map[string]StatusOrdersInfo)
	for _, status := range statuses {
		var sTotal, sAtPeriod int
		db.Model(&Order{}).Where("supplier_id = ? AND status_code = ?", id, status.Code).Count(&sTotal)
		db.Model(&Order{}).Where("supplier_id = ? AND status_code = ? AND updated_at BETWEEN ? AND ?",
			id, status.Code, tp.Start, tp.End).Count(&sAtPeriod)
		name := strings.Replace(*status.Status.EN, " ", "_", -1)
		sOrdInfo[name] = StatusOrdersInfo{
			Text: *status.Status.RU,
			Stats: StatsInfo{
				Total:    sTotal,
				Period:   tp,
				AtPeriod: sAtPeriod,
			},
		}
	}

	return SupplierOrdersInfo{
		ID:           id,
		Name:         name,
		SupplierInfo: *s,
		Summary: StatsInfo{
			Total:    total,
			Period:   tp,
			AtPeriod: atPeriod,
		},
		ByStatus:       sOrdInfo,
		SumTotal:       sumTotal,
		SumAtPeriod:    sumAtPeriod,
		ChargeTotal:    chargeTotal,
		ChargeAtPeriod: chargeAtPeriod,
	}
}
