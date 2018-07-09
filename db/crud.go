package db

import (
	"errors"
	uuid "github.com/satori/go.uuid"
	"log"
	"reflect"
)

var crudEntities = map[string]reflect.Type{
	//"text": reflect.TypeOf(Text{}),
	"user": reflect.TypeOf(User{}),
}
var EntitiesList []string

func NewObject(entity_name string) (interface{}, error) {
	objType, ok := crudEntities[entity_name]
	if !ok {
		return nil, errors.New("no such entity")
	}
	return reflect.New(objType).Elem().Addr().Interface(), nil
}

func NewSlice(entity_name string) (interface{}, error) {
	objType, ok := crudEntities[entity_name]
	if !ok {
		return nil, errors.New("no such entity")
	}
	return reflect.New(reflect.SliceOf(objType)).Elem().Addr().Interface(), nil
}

func Create(entity interface{}) error {
	return db.Create(entity).Error
}

func Read(entity_name, id_text string) (interface{}, error) {
	id, err := uuid.FromString(id_text)
	if err != nil {
		return nil, err
	}
	var objPtr interface{}
	objPtr, err = NewObject(entity_name)
	if err != nil {
		return nil, err
	}
	if err = db.Where("id = ? and not deleted", id).First(objPtr).Error; err != nil {
		return nil, err
	}
	return objPtr, nil
}

func ReadAll(entity_name string) (interface{}, error) {
	objPtr, err := NewSlice(entity_name)
	if err != nil {
		return nil, err
	}
	if err = db.Find(objPtr, "not deleted").Error; err != nil {
		return nil, err
	}
	return objPtr, nil
}

func Update(entity_name, id_text string, objPtr interface{}) (interface{}, error) {
	id, err := uuid.FromString(id_text)
	if err != nil {
		return nil, err
	}
	v := reflect.ValueOf(objPtr).Elem().FieldByName("ID")
	if !v.IsValid() || !v.CanSet() {
		return nil, errors.New("invalid entity object")
	}
	v.Set(reflect.ValueOf(UUID{id}))
	log.Print(objPtr)
	if err = db.Save(objPtr).Error; err != nil {
		return nil, err
	}
	return objPtr, nil
}

func Delete(entity_name, id_text string) error {
	id, err := uuid.FromString(id_text)
	if err != nil {
		return err
	}
	var objPtr interface{}
	objPtr, err = NewObject(entity_name)
	if err != nil {
		return err
	}
	if err = db.Find(objPtr, "id = ? and not deleted", id).Error; err != nil {
		return err
	}
	return db.Model(objPtr).Where("id = ? and not deleted", id).Update("deleted", true).Error
}

func fillEntitiesList() {
	keys := make([]string, 0, len(crudEntities))
	for e := range crudEntities {
		keys = append(keys, e)
	}
	EntitiesList = keys
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
