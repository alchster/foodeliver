# Food delivery service JSON API

## Requirements

- PostgreSQL
 + extension 'uuid-ossp' for UUID generation
```PLpgSQL
CREATE EXTENSION "uuid-ossp";
```
 + extension 'pgcrypto' for passwords checking (CREATE EXTENSION "pgcrypto";)

## Installation
(_This is sample configuration. Default names and paths are used. Please don't use commands as they are given here_)

1. Create DB user:
```Shell
$ createuser food
```
2. Create database:
```Shell
$ createdb -U postgres --owner=food --encoding=utf-8 food
```
3. Go to package directory and build the package (skip this option, if you are using pre-compiled binary):
```Shell
$ go get github.com/alchster/foodeliver
$ cd $HOME/go/src/github.com/alchster/foodeliver
$ go build
```
4. Edit the configuration file (`foodeliver.config.json`). Replace configuration options values with ones that you specified at previous steps.
5. Create database schema:
```Shell
$ ./foodeliver -migrate
```
If you hadn't see any error after running this command, you're the lucky one. If not, please check you've done all the previous steps right

## Running and deployment

...
