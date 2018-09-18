package api_v1

import (
	"github.com/alchster/foodeliver/db"
	//"github.com/gin-gonic/gin"
	//"log"
	//"net/http"
)

func moderatorDataCatalog(moderatorId db.UUID) map[string]interface{} {
	data := make(map[string]interface{})
	data["suppliers"], data["products"],
		data["categories"], data["stations"], data["statuses"], _ = db.ModeratorCatalog(moderatorId)
	return data
}
