# Ecommerce web application

## Description

The front end of the single page application is written in VueJS, the back end uses NodeJS and MongoDB. The application displays a list of products received from a third-party API and then saved in the MongoDB database. Users can select products, add them to cart and order them. For the manager, there is an admin page for managing orders.
The application is set up with Docker.

## Required

Make sure you have MongoDB client, npm and last version of NodeJS set up on your local machine.

- [Docker](https://docs.docker.com/install/) `latest`
- [Docker compose](https://docs.docker.com/compose/install/) `latest`

Note: App runs on the Ports 8080, 3000, 2017. Make sure they're free.
Note: Application is still in development!

## Build client Vue Cli

```
cd /client
npm run serve
```

## Build client SSR

```
cd /client
npm run build-server
npm run start-server
```

## Docker setup

```
docker-compose build
```
```
docker-compose up
```
## Lint errors

To lint errors in `/client` folder:

``` npm run lint ```

### Aliexpress api 

[api](https://rapidapi.com/?utm_campaign=Quora&utm_medium=link_Marketplace&utm_source=Quora)

### Issue

Make `http-server` (SSR) work with Vue Router.
