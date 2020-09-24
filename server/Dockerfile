FROM node:10

WORKDIR /server

COPY ./package*.json ./

RUN npm install

COPY . .

EXPOSE 3000 8999

CMD ["node", "server.js"]