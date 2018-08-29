package api_v1

import "github.com/alchster/foodeliver/db"
import "fmt"

func adminIndexInfo(userId string) map[string]interface{} {
	result := make(map[string]interface{})
	result["stations"], _ = db.ReadAll("station", userId)
	result["trains"], _ = db.ReadAll("train", userId)
	if services, err := db.ReadAll("service", userId); err == nil {
		result["service"] = services.([]db.Service)[0]
	}
	fmt.Printf("%+v\n", result["service"])
	return result
}
