## Build app

```bash
#build and run app
$ docker compose up -d 
```

## Fake Data

```bash
#connect to db and run query:
$ CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

#open terminal and run 
$ curl --location 'http://localhost:8000/users' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'name=Duy' \
--data-urlencode 'email=duy@gmail.com' \
--data-urlencode 'password=123456'

# test api
$ localhost:8000/swagger
```

## Enjoy
```bash
# test api
$ localhost:8000/swagger
```



