package main

import (
	"context"
	"fmt"
	"github.com/heetch/confita"
	"github.com/heetch/confita/backend/file"
	"github.com/heetch/confita/backend/flags"
	"strings"
)

type database struct {
	Host     string   `config:"database-host"`
	Port     uint16   `config:"database-port"`
	DBName   string   `config:"database-dbname"`
	User     string   `config:"database-user"`
	Password string   `config:"database-password"`
	Options  []string `config:"database-options"`
}

type config struct {
	ListenOn string `config:"listen"`
	Debug    bool   `config:"debug"`
	Prefix   string `config:"prefix"`
	Migrate  bool   `config:"migrate,backend=flags"`
	Database database
}

func loadConfig() (*config, error) {
	cfg := config{
		ListenOn: DEFAULT_LISTENON,
		Debug:    DEBUG,
		Prefix:   "/api",
		Database: database{
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
	err := loader.Load(context.Background(), &cfg)
	return &cfg, err
}

func (c config) String() string {
	return fmt.Sprintf("Config:\n  ListenOn:\t%s\n  Debug:\t%v\n  Database:\t%s",
		c.ListenOn, c.Debug, c.Database)
}

func (d database) String() string {
	s := fmt.Sprintf("postgres://%s:%s@%s:%d/%s",
		d.User, d.Password, d.Host, d.Port, d.DBName)
	if len(d.Options) > 0 {
		s = fmt.Sprintf("%s?%s", s, strings.Join(d.Options, "&"))
	}
	return s
}
