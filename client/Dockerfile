FROM node:10

RUN npm install -g http-server
RUN npm install spa-http-server --save-dev

WORKDIR /client

COPY ./package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080
CMD ["npm", "test:dev"]

