## Build app for test

```bash
#build and run app
$ COMPOSE_FILE=docker-compose.test.yml  docker-compose --env-file .env.test  up -d --build  
```

## Fake Data Cach 1

```bash

$ cd path/project

$ npm i

$ npx knex migrate:latest

$ knex seed:run
```

## Fake Data Cach 2

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
```


# Test UT app
```bash

$ npm run dev users-microservice  //users-microservice

$ npm run dev dbs-microservice    //db-microservice

$ npm test // nest jest

```