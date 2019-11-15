FROM node:10

WORKDIR /client

COPY ./package*.json ./

RUN npm install

RUN npm install -g http-server

COPY . .

RUN npm run build

EXPOSE 8081
CMD ["npm", "test:dev"]
