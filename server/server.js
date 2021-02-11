
const express = require('express');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');

const mongoose = require('mongoose')
const bodyParser = require('body-parser');

const ProductModel = require('./models/entities/Products');
const UserModel = require('./models/entities/Users');
const OrderModel = require('./models/entities/Orders');
const StatusModel = require('./models/entities/Status');

const app = express();
const server = 'mongodb://mongo:27017'
const database = 'ishop';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const clientUrl = 'http://localhost:8090';

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


mongoose.connect(`${server}/${database}`)
.then(() => {
  console.log('Database connection successful')
    const port = 3000;
    
    app.get('/getProducts', cors(corsOptions), (req, res) => {
      ProductModel.find()
      .then(data => res.json(data), err => res.json(err));
    }); 

    app.get('/getUsers', cors(corsOptions), (req, res) => {
      UserModel.find()
        .then(data => res.json(data), err => res.json(err));
    });
    
    app.post('/saveOrder', (req, res) => {
      const model = new OrderModel(req.body.order)
      model.save()
        .then(data => res.json(data), err => res.json(err));
    });
    
    app.post('/setStatus', (req, res) => {
      const model = new StatusModel(req.body.order)
      model.save()
        .then(data => res.json(data), err => res.json(err));
    });
    
    app.post('/deleteOrder', (req, res) => {
      OrderModel.findOneAndRemove({ '_id': req.body.id })
        .then(data => res.json(data), err => res.json('error', err));
    });

    app.get('/getOrders', (req, res) => {
      OrderModel.find()
        .then(data => res.json(data), err => res.json('error', err));
    });

    app.listen(port);
    startWebSocketServer()
})
.catch(err => {
  console.error('Database connection error', err)
})
function startWebSocketServer() {
  const app = express();
  const connections = new Set(); // Storage of connections
  const lastModification = 0; // Greater modified
  const server = http.createServer(app);

  const socket = new WebSocket.Server({ server });

  server.listen('8999', () => {
    console.log(`WebSocket started on port ${server.address().port} :)`);
  });

  socket.on('connection', (req) => {
    const connection = req;
    connections.add(connection);
    OrderModel
      .find()
      .then(data => req.send(JSON.stringify(data)), err => res.json(err));
  });
  socket.on('close', (req) => {
    client.close();
    connections.delete(connection);
  });
}