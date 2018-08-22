package api_v1

const (
	READ permissions = 1 << iota
	CREATE
	UPDATE
	DELETE
)
const (
	RW   = READ | CREATE | UPDATE
	FULL = READ | CREATE | UPDATE | DELETE
)

type permissions int8
type entityPermissions map[string]permissions

var permissionsTable = map[string]entityPermissions{
	"administrator": entityPermissions{
		"user":     FULL,
		"supplier": FULL,
		"station":  FULL,
		"train":    FULL,
		"service":  FULL,
	},
	"moderator": entityPermissions{
		"supplier": RW,
		"product":  RW,
	},
	"supplier": entityPermissions{
		"product": FULL,
	},
}

func hasPermission(role, entity string, perm permissions) bool {
	if entList, ok := permissionsTable[role]; ok {
		if entPerm, ok := entList[entity]; ok {
			return entPerm&perm != 0
		}
	}
	return false
}

type MenuItem struct {
	URL     string
	Class   string
	Picture string
	Text    string
}

var pages = map[string]MenuItem{
	"admin":      {"/admin", "icon-administrirov", "#administrirov", "Администри- рование"},
	"moder":      {"/moderator", "icon-administrirov", "#administrirov", "Мои поставщики"},
	"accounts":   {"/accounts", "icon-users", "#users", "Учетные записи"},
	"settings":   {"/settings", "icon-nastroika", "#nastroika", "Настройки"},
	"registry":   {"/registry", "icon-list", "#list", "Реестр поставщиков"},
	"categories": {"/categories", "icon-hamburger-2", "#hamburger-2", "Категории товаров"},
	"catalog":    {"/catalog", "icon-hamburger-2", "#hamburger-2", "Каталог товаров"},
	"statistics": {"/statistics", "icon-sale-statistics", "#sale-statistics", "Статистика"},
}

var rolePages = map[string][]string{
	"administrator": {"admin", "accounts", "registry", "categories", "statistics", "settings"},
	"moderator":     {"settings", "moder", "catalog"},
	"supplier":      {"settings"},
}

func indexForRole(role string) string {
	pagesList, ok := rolePages[role]
	if !ok {
		sett, _ := pages["settings"]
		return sett.URL
	}
	mi, _ := pages[pagesList[0]]
	return mi.URL
}

func hasAccess(role, url string) bool {
	if pagesMap, ok := rolePages[role]; ok {
		for _, page := range pagesMap {
			item, has := pages[page]
			if has && item.URL == url {
				return true
			}
		}
	}
	return false
}

func menuItems(role string) []MenuItem {
	pagesMap, ok := rolePages[role]
	if !ok {
		return nil
	}
	menu := make([]MenuItem, 0, len(pagesMap))
	for _, page := range pagesMap {
		item, has := pages[page]
		if has {
			menu = append(menu, item)
		}
	}
	return menu
}
