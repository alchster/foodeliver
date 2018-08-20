package main

import (
	"context"
	"fmt"
	"github.com/heetch/confita"
	"github.com/heetch/confita/backend/file"
	"github.com/heetch/confita/backend/flags"
	"strings"
	"time"
)

type Database struct {
	Host     string   `config:"database-host"`
	Port     uint16   `config:"database-port"`
	DBName   string   `config:"database-dbname"`
	User     string   `config:"database-user"`
	Password string   `config:"database-password"`
	Options  []string `config:"database-options"`
}

type Config struct {
	ListenOn string   `config:"listen"`
	Debug    bool     `config:"debug"`
	Prefix   string   `config:"prefix"`
	Migrate  bool     `config:"migrate,backend=flags"`
	TrainID  string   `config:"train-id"`
	Database Database `config:"required,backend=file"`
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
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	err := loader.Load(ctx, &cfg)
	return &cfg, err
}

func (c *Config) String() string {
	return fmt.Sprintf(
		"Config:\n"+
			"  ListenOn:\t%s\n"+
			"  Debug:\t%v\n"+
			"  Database:\t%s\n"+
			"  TrainID:\t%s\n",
		c.ListenOn, c.Debug, c.Database, c.TrainID)
}

func (d Database) String() string {
	s := fmt.Sprintf("postgres://%s:%s@%s:%d/%s",
		d.User, d.Password, d.Host, d.Port, d.DBName)
	if len(d.Options) > 0 {
		s = fmt.Sprintf("%s?%s", s, strings.Join(d.Options, "&"))
	}
	return s
}
