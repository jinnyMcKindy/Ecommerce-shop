# Ecommerce web application

## Description

This is single page application. Client side is made with VueJS, server side is made with NodeJS + MongoDB.
Application get list of products from the third-party API, save them to the MongoDB and display on the main page.
User can choose, move to cart and order the prodicts.
There's also admin page to manage the orders.

## Required

Make sure you have MongoDB client, npm and last version of NodeJS set up on your local machine.

- Node version `v11.8.0`
- npm version `6.9.0`

## Project setup
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

### Lints and shows errors and warnings
```
npm run lint
```

### Fix js errors 

``` node_modules/.bin/eslint ./server --fix ```

### Lint errors 

``` npm run lint ```

### MongoDB start on specific port
```
sudo mongod --port 12345
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

Used my gmail to sign in
