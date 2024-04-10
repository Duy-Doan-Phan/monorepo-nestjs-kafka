FROM node:18

WORKDIR /usr/scr/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build api-gateway && \
    npm run build dbs-microservice && \
    npm run build users-microservice

EXPOSE 8000

CMD ["node", "./dist/apps/api-gateway/main.js"] && ["node", "./dist/apps/dbs-microservice/main.js"] && ["node", "./dist/apps/users-microservice/main.js"]

