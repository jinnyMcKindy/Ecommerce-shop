# Ecommerce web application

## Description

The front end of the single page application is written in VueJS, the back end uses NodeJS and MongoDB. The application displays a list of products received from a third-party API and then saved in the MongoDB database. Users can select products, add them to cart and order them. For the manager, there is an admin page for managing orders.

## Required

Make sure you have MongoDB client, npm and last version of NodeJS set up on your local machine.

- Node version `v11.8.0`
- npm version `6.9.0`

## Docker setup

```
docker-compose build
```
```
docker-compose up
```

## Project dev setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Fix js errors 

``` node_modules/.bin/eslint ./server --fix ```

### Lint errors 

``` npm run lint ```

### MongoDB start on specific port
```
sudo mongod --port 27017
```
### Shutdown MongoDB

``` 
mongod --shutdown
```

### Start server-side application on NodeJS

```
node ./server 
```

### Aliexpress api 

(api)[https://rapidapi.com/?utm_campaign=Quora&utm_medium=link_Marketplace&utm_source=Quora]

### Issue

Сначала открывается коннект по выборке продуктов до того, как продукты в него положены, и так и держится. Надо переписать на монгуз.