FROM node:10

RUN npm install -g http-server

WORKDIR /server

COPY ./package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]