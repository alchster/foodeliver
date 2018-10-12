package main

import (
	"context"
	"fmt"
	"github.com/heetch/confita"
	"github.com/heetch/confita/backend/file"
	"github.com/heetch/confita/backend/flags"
	"strings"
)

type Mailer struct {
	Server    string   `config:"server,backend=json"`
	User      string   `config:"user,backend=json"`
	Password  string   `config:"password,backend=json"`
	Options   []string `config:"options,backend=json"`
	From      string   `config:"from,backend=json"`
	Templates string   `config:"templates,backend=json"`
	URL       string   `config:"url,backend=json"`
}

type Database struct {
	Host     string   `config:"host,backend=json"`
	Port     uint16   `config:"port,backend=json"`
	DBName   string   `config:"dbname,backend=json"`
	User     string   `config:"user,backend=json"`
	Password string   `config:"password,backend=json"`
	Options  []string `config:"options,backend=json"`
}

type Config struct {
	Debug    bool     `config:"debug"`
	ListenOn string   `config:"listen"`
	Prefix   string   `config:"prefix"`
	Migrate  bool     `config:"migrate,backend=flags"`
	TrainID  string   `config:"train-id,backend=flags"`
	NodeID   string   `config:"node-id,backend=flags"`
	Database Database `config:"database,required,backend=json"`
	Mailer   Mailer   `config:"mailer,backend=json"`
	Storage  string   `config:"storage,required,backend=json"`
}

func loadConfig() (*Config, error) {
	cfg := Config{
		ListenOn: DEFAULT_LISTENON,
		Debug:    DEBUG,
		Prefix:   "/api",
		NodeID:   "001",
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
			"  StoragePath:\t%s\n"+
			"  Mailer:\t%s\n",
		c.ListenOn, c.Debug, c.Database, c.TrainID, c.Storage, c.Mailer)
}

func (d Database) String() string {
	s := fmt.Sprintf("postgres://%s:%s@%s:%d/%s",
		d.User, "******", d.Host, d.Port, d.DBName)
	if len(d.Options) > 0 {
		s = fmt.Sprintf("%s?%s", s, strings.Join(d.Options, "&"))
	}
	return s
}

func (m Mailer) String() string {
	s := fmt.Sprintf("\n    URI: smtp://%s:%s@%s", m.User, "******", m.Server)
	if len(m.Options) > 0 {
		s = fmt.Sprintf("%s?%s", s, strings.Join(m.Options, "&"))
	}
	s = fmt.Sprintf("%s\n    From: %s\n    Templates path: %s\n    URL: %s", s, m.From, m.Templates, m.URL)
	return s
}
