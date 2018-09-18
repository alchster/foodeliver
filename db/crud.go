package db

import (
	"errors"
	"github.com/satori/go.uuid"
	"golang.org/x/crypto/bcrypt"
	"reflect"
	"time"
)

const tagName = "crud"

var crudEntities = map[string]reflect.Type{
	"text":             reflect.TypeOf(Text{}),
	"user":             reflect.TypeOf(User{}),
	"supplier":         reflect.TypeOf(Supplier{}),
	"station":          reflect.TypeOf(Station{}),
	"train":            reflect.TypeOf(Train{}),
	"service":          reflect.TypeOf(Service{}),
	"passenger":        reflect.TypeOf(Passenger{}),
	"product":          reflect.TypeOf(Product{}),
	"order":            reflect.TypeOf(Order{}),
	"-supplierstation": reflect.TypeOf(SupplierStation{}),
	"-stationlist":     reflect.TypeOf(StationsListItem{}),
	"-orderproduct":    reflect.TypeOf(OrderProduct{}),
	"-basketproduct":   reflect.TypeOf(BasketProduct{}),
}

var EntitiesList = []string{
	"text",
	"user",
	"supplier",
	"station",
	"train",
	"service",
	"passenger",
	"product",
	"order",
	"-supplierstation",
	"-stationlist",
	"-orderproduct",
	"-basketproduct",
}

func NewObject(entityName string) (interface{}, error) {
	objType, ok := crudEntities[entityName]
	if !ok {
		return nil, errors.New("no such entity")
	}
	return reflect.New(objType).Elem().Addr().Interface(), nil
}

func NewSlice(entityName string) (interface{}, error) {
	objType, ok := crudEntities[entityName]
	if !ok {
		return nil, errors.New("no such entity")
	}
	return reflect.New(reflect.SliceOf(objType)).Elem().Addr().Interface(), nil
}

func GetUUID(idText string) (UUID, error) {
	id, err := uuid.FromString(idText)
	return UUID{id}, err
}

func Create(entity interface{}, creator string) error {
	if err := db.Create(entity).Error; err != nil {
		return err
	}
	return nil
}

func Read(entityName, idText, reader string) (interface{}, error) {
	id, idErr := GetUUID(idText)
	if idErr != nil {
		return nil, idErr
	}
	objPtr, err := NewObject(entityName)
	if err != nil {
		return nil, err
	}
	if err = db.Where("id = ?", id).First(objPtr).Error; err != nil {
		return nil, err
	}
	return objPtr, nil
}

func ReadAll(entityName, reader string) (interface{}, error) {
	objPtr, err := NewSlice(entityName)
	if err != nil {
		return nil, err
	}
	if err = db.Order("created_at desc").Find(objPtr).Error; err != nil {
		return nil, err
	}
	return reflect.ValueOf(objPtr).Elem().Interface(), nil
}

func Update(entityName, id string, data map[string]interface{}, userId string) error {
	objPtr, err := NewObject(entityName)
	if err != nil {
		return err
	}
	if val, ok := data["login"]; ok && val.(string) == "" {
		return errors.New("Login cannot be empty")
	}
	if val, ok := data["password"]; ok {
		if val.(string) == "" {
			return errors.New("Password cannot be empty")
		}
		data["password"] = cryptPassword(val.(string))
	}
	data["updated_at"] = time.Now()

	return db.Model(objPtr).Where("id = ?", id).UpdateColumns(data).Error
}

func Delete(entity_name, id_text, deleter string) error {
	id, err := uuid.FromString(id_text)
	if err != nil {
		return err
	}
	var objPtr interface{}
	objPtr, err = NewObject(entity_name)
	if err != nil {
		return err
	}
	if err = db.Where("id = ?", id).First(objPtr).Error; err != nil {
		return err
	}
	return db.Delete(objPtr).Error
}

func CheckLogin(login, password string) (interface{}, error) {
	var u PasswordChecker
	u = new(User)
	if err := db.Where("login = ? and enabled", login).First(u).Error; err != nil {
		u = new(Supplier)
		if err = db.Where("login = ? and status_code = ?", login, SUPPLIER_STATUS_ACTIVE).
			First(u).Error; err != nil {
			return nil, errors.New("incorrect username")
		}
	}
	if !CheckPassword(u.GetPassword(), password) {
		return nil, errors.New("incorrect password")
	}
	return u, nil
}

func cryptPassword(password string) string {
	hash, _ := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(hash)
}

func CheckPassword(hash, password string) bool {
	return bcrypt.CompareHashAndPassword([]byte(hash), []byte(password)) == nil
}

func migrateEntities() error {
	for _, entity := range EntitiesList {
		objPtr, err := NewObject(entity)
		if err != nil {
			return err
		}
		if err = db.AutoMigrate(objPtr).Error; err != nil {
			return err
		}
	}
	return nil
}
