FROM node:10

WORKDIR /mongo

COPY ./package*.json ./

RUN npm install

COPY . .

EXPOSE 8087

CMD ["node", "initDB.js"]