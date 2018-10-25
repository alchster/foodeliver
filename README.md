#  Доставка еды

## Требования

- PostgreSQL >=9.4
- Компилтор языка Go версии >=1.8 (нужен, чтобы скомпилировать приложение, если будет использоваться прекомпилированный бинарный файл, то можно проигнорировать этот пункт)

## Установка
(_Эта конфигурация приведена для примера. Использованы значения и пути по-умолчанию. Пожалуйста, используйте свои значения_)

1. Создание пользователя базы данных:

	```Shell
	$ createuser food
	```

2. Создание базы данных:

	```Shell
	$ createdb -U postgres --owner=food --encoding=utf-8 food
	```

3. Скачайте исходные тексты программы и скомпилируйте бинарный файл (пропустите этот пункт, если вы используете собранный бинарный файл):

	```Shell
	$ go get github.com/alchster/foodeliver
	$ cd $HOME/go/src/github.com/alchster/foodeliver
	$ go build
	_опционально (если был изменён `js/api.js`):_
	$ npm run build
	```

4. Отредактируйте конфигурационный файл, используя ваши значения (`foodeliver.config.json`).
5. Создание схемы базы данных (миграция БД):

	```Shell
	$ ./foodeliver -migrate
	```

При выполнении последнего пункта **будет так же создан пользователь с административными полномочиями**. Сгенерированный пароль будет выведен на консоль.


## Запуск

Приложение может работать в двух режимах:

	- административный (необходимые файлы расположены в `build/<arch>/server`)

	- поездной (`build/<arch>/train`)


Список параметров командной строки можно получить, запустив приложение с параметром `-help`.
Приложение не имеет встроенного режима работы в качестве службы. Его можно использовать в качестве облачной службы или запустить с параметром `&` в конце командной строки, чтобы оно работало в фоновом режиме. Лог по-умолчанию выводится на `stdout`. Перенаправить в файл можно стандартными средствами используемой оболочки командной строки.


### Административный режим

Приложение запускается в этом режиме, если не указан параметр `-train`. Данный режим предназанчен для управления работой сервиса.

Приложение способно работать полноценно самостоятельно, но для уменьшения нагрузки на процессор рекомендуется статические файлы отдавать через nginx. Так же, для дополнительной безопасности паролей пользователей рекомендуется использовать протокол HTTPS.

Пример конфигурации сервера для nginx:

```nginx
server {
	listen <порт>;
	server_name <имя сервера>;

	root /dev/null;
	# дополнительные опции

	location / {
		proxy_pass http://<адрес и порт, указанные в конфигурации приложения>/;
		proxy_set_header X-Real-IP $remote_addr;
		# дополнительные опции
	}
	location ~ \.(jpg,png,js,css) {
		root <путь к приложению>/static;
		# дополнительные опции	
	}
}
```


### Поездной режим

Данный режим предназначен для запуска на каждом поезде, на котором используется сервис. Для запуска в этом режиме необходимо запустить приложение с параметром `-train <номер поезда>`. Пример:
```Shell
$ ./foodeliver -train 472C
```
Чтобы упростить установку на поездные системы, необходимо поправить параметры (пути установки, пути к конфигурационным файлам, запускаемые дополнительно скрипты и т.п.) в файле `deploy-train.sh`, после чего можно использовать эту утилиту, просто передавая IP адрес системы, куда производится установка.

В поездном режиме приложение работает только как сервер API, поэтому для работы необходимо настроить отдельные конфигурации: для статических файлов портала и для работы API через CORS.

Статические файлы и файлы хранилища:

```nginx
server {
	listen <порт>;
	server_name <имя сервера>;

	root <путь к статическим файлам>;
	# дополнительные опции

  # правила для файлового хранилища
	location /files {
		root <путь к хранилищу>;
    # /files/093bd8d7-1c2e-4613-b88e-e0549abcdd34.png => <путь к хранилищу>/09/093bd8d7-1c2e-4613-b88e-e0549abcdd34.png
    rewrite "^/files/((\w{2}).*)$" /$2/$1 break;
  }
}
```

API:

```nginx
server {
	listen <порт>;
	server_name <имя сервера>;

	root /dev/null;
	# дополнительные опции

	location / {
		add_header Access-Control-Allow-Methods "GET, POST, PUT, PATCH, DELETE" always;
		add_header Access-Control-Allow-Headers * always;
    # для работы браузеров, которые не умеют работать с *
    add_header Access-Control-Allow-Headers Accept,Content-Type,Origin,X-Requested-With always;
		add_header Access-Control-Allow-Origin * always;
		if ($request_method = OPTIONS) {
			return 200;
		}

		proxy_pass http://<адрес и порт, указанные в конфигурации приложения>/;
		proxy_set_header X-Real-IP $remote_addr;
	}
}
```


### Обновление информации о поездах и станциях

Для обновления можно использовать любые возможные средства, от ручного внесения через командную строку базы данных, до использования различных утилит и коннекторов. Так же возможно внесение информации через API (необходимо использование JWT). Структуры таблиц представлены ниже.

Для связи поездов со станциями используется таблица many2many связей `stations_list_items`.

Вся неслужебная текстовая информация (например, название поезда или станции) находится в таблице `texts`.


##  Таблица `trains`:

```
food=> \d+ trains;
                                                          Таблица "public.trains"
  Столбец   |           Тип            | Правило сортировки | Допустимость NULL | По умолчанию | Хранилище | Цель для статистики | Описание 
------------+--------------------------+--------------------+-------------------+--------------+-----------+---------------------+----------
 id         | uuid                     |                    | not null          |              | plain     |                     | 
 created\_at | timestamp with time zone |                    | not null          | now()        | plain     |                     | 
 updated\_at | timestamp with time zone |                    |                   |              | plain     |                     | 
 deleted\_at | timestamp with time zone |                    |                   |              | plain     |                     | 
 text\_id    | uuid                     |                    |                   |              | plain     |                     | 
 number     | text                     |                    |                   |              | extended  |                     | 
 alias      | text                     |                    |                   |              | extended  |                     | 
 active     | boolean                  |                    |                   |              | plain     |                     | 
Индексы:
    "trains_pkey" PRIMARY KEY, btree (id)
Ограничения внешнего ключа:
    "trains_text_id_fkey" FOREIGN KEY (text_id) REFERENCES texts(id)
```


##  Таблица `stations`:

```
food=> \d+ stations;
                                                         Таблица "public.stations"
  Столбец   |           Тип            | Правило сортировки | Допустимость NULL | По умолчанию | Хранилище | Цель для статистики | Описание 
------------+--------------------------+--------------------+-------------------+--------------+-----------+---------------------+----------
 id         | uuid                     |                    | not null          |              | plain     |                     | 
 created\_at | timestamp with time zone |                    | not null          | now()        | plain     |                     | 
 updated\_at | timestamp with time zone |                    |                   |              | plain     |                     | 
 deleted\_at | timestamp with time zone |                    |                   |              | plain     |                     | 
 text\_id    | uuid                     |                    |                   |              | plain     |                     | 
 tz         | text                     |                    |                   |              | extended  |                     | 
 active     | boolean                  |                    |                   |              | plain     |                     | 
Индексы:
    "stations_pkey" PRIMARY KEY, btree (id)
    "udx_login_deleted" UNIQUE, btree (deleted_at)
Ограничения внешнего ключа:
    "stations_text_id_fkey" FOREIGN KEY (text_id) REFERENCES texts(id)
```


##  Таблица `stations_list_items`:

```
food=> \d+ stations_list_items;
                                               Таблица "public.stations_list_items"
      Столбец       |  Тип   | Правило сортировки | Допустимость NULL | По умолчанию | Хранилище | Цель для статистики | Описание 
--------------------+--------+--------------------+-------------------+--------------+-----------+---------------------+----------
 train\_id           | uuid   |                    | not null          |              | plain     |                     | 
 station\_id         | uuid   |                    | not null          |              | plain     |                     | 
 relative\_arrival   | bigint |                    | not null          |              | plain     |                     | 
 relative\_departure | bigint |                    | not null          |              | plain     |                     | 
```


##  Таблица `texts`:

```
food=> \d+ texts;
                                               Таблица "public.texts"
 Столбец | Тип  | Правило сортировки | Допустимость NULL | По умолчанию | Хранилище | Цель для статистики | Описание 
---------+------+--------------------+-------------------+--------------+-----------+---------------------+----------
 id      | uuid |                    | not null          |              | plain     |                     | 
 en      | text |                    |                   |              | extended  |                     | 
 ru      | text |                    |                   |              | extended  |                     | 
 zh      | text |                    |                   |              | extended  |                     | 
Индексы:
    "texts_pkey" PRIMARY KEY, btree (id)
```
