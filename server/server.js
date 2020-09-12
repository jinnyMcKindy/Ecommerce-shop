
const express = require('express');
const cors = require('cors');
const http = require('http');
const mongo = require('mongodb').MongoClient;


const app = express();
const md5 = require('md5');
const bodyParser = require('body-parser');
const WebSocket = require('ws');
const dbo = require('./models/database');
const products = require('./models/products');

const db = dbo.DataBase;
const url = 'mongodb://mongo:27017/';
const Order = require('./models/entities/Order')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const clientUrl = 'http://localhost:8081';
const corsOptions = {
  origin: clientUrl,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors());
app.all('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', clientUrl);
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

startMongoDBConnection();
// Mongo Connection

function startMongoDBConnection() {
  mongo.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    //products.getContent.then(res => console.log(res.length, 'There"re products'), err => console.log(err)
    products.saveContent.then(res => {
      console.log('Saved products')
      startServerApi(client);
    }, err => console.log(err))
    
    db.saveUser({login: "admin", password: md5("12345") })
    .then(data => console.log('Saved admin'), err => console.log(err));
   // startWebSocketServer(client);
  });
}

function startServerApi(client) {  
  const hostname = '127.0.0.1';
  const port = 3000;
  app.get('/getProducts', cors(corsOptions), (req, res) => {
    products.getContent
      .then(data => res.json(data), err => res.json(err));
  });
  app.get('/getUsers', cors(corsOptions), (req, res) => {
    db.getUsers()
      .then(data => res.json(data), err => res.json(err));
  });
  app.post('/saveOrder', (req, res) => {
    // console.log(req.body)
    db.saveOrder(req.body.order)
      .then(data => res.json(data), err => res.json(err));
  });
  app.post('/setStatus', (req, res) => {
    // console.log(req.body)
    db.setStatus(req.body.statusObj)
      .then(data => res.json(data), err => res.json('error', err));
  });
  app.post('/deleteOrder', (req, res) => {
    db.deleteOrder(req.body.id)
      .then(data => res.json(data), err => res.json('error', err));
  });
  app.get('/getOrders', (req, res) => {
    db.getOrders()
      .then(data => res.json(data), err => res.json('error', err));
  });
  app.listen(port);
}

// Websocket
function startWebSocketServer(client) {
  const db = client.db('ishop');
  const connections = new Set(); // Storage of connections
  const lastModification = 0; // Greater modified
  const server = http.createServer(app);

  const socket = new WebSocket.Server({ server });

  server.listen(8999, () => {
    console.log(`Server started on port ${server.address().port} :)`);
  });

  socket.on('connection', (req) => {
    const connection = req;
    connections.add(connection);
    db
      .collection('orders')
      .find()
      .toArray((err, docs) => {
        req.send(JSON.stringify(docs));
      });
  });
  socket.on('close', (req) => {
    client.close();
    connections.delete(connection);
  });
}
