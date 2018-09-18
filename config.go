package main

import (
	"context"
	"fmt"
	"github.com/heetch/confita"
	"github.com/heetch/confita/backend/file"
	"github.com/heetch/confita/backend/flags"
	"strings"
	//"time"
)

type Database struct {
	Host     string   `config:"dbhost"`
	Port     uint16   `config:"dbport"`
	DBName   string   `config:"dbname"`
	User     string   `config:"dbuser"`
	Password string   `config:"dbpassword"`
	Options  []string `config:"dboptions"`
}

type Config struct {
	Debug    bool     `config:"debug"`
	ListenOn string   `config:"listen"`
	Prefix   string   `config:"prefix"`
	Migrate  bool     `config:"migrate,backend=flags"`
	TrainID  string   `config:"train-id,backend=flags"`
	Database Database `config:"database,required,backend=file"`
	Storage  string   `config:"storage,required"`
}

func loadConfig() (*Config, error) {
	cfg := Config{
		ListenOn: DEFAULT_LISTENON,
		Debug:    DEBUG,
		Prefix:   "/api",
		Database: Database{
			Host:   "127.0.0.1",
			Port:   5432,
			DBName: "food",
			User:   "food",
		},
	}

	loader := confita.NewLoader(
		file.NewBackend(CONFIG_FILE_JSON),
		flags.NewBackend(),
	)
	err := loader.Load(context.TODO(), &cfg)

	return &cfg, err
}

func (c *Config) String() string {
	return fmt.Sprintf(
		"Config:\n"+
			"  ListenOn:\t%s\n"+
			"  Debug:\t%v\n"+
			"  Database:\t%s\n"+
			"  TrainID:\t%s\n"+
			"  StoragePath:\t%s\n",
		c.ListenOn, c.Debug, c.Database, c.TrainID, c.Storage)
}

func (d Database) String() string {
	s := fmt.Sprintf("postgres://%s:%s@%s:%d/%s",
		d.User, d.Password, d.Host, d.Port, d.DBName)
	if len(d.Options) > 0 {
		s = fmt.Sprintf("%s?%s", s, strings.Join(d.Options, "&"))
	}
	return s
}
