
const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose')
const bodyParser = require('body-parser');

const ProductModel = require('./models/entities/Products');
const UserModel = require('./models/entities/Users');
const OrderModel = require('./models/entities/Orders');

const app = express();
const server = 'mongodb://mongo:27017'
const database = 'ishop';

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
    /*
    app.post('/saveOrder', (req, res) => {
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
    */
    app.listen(port);
})
.catch(err => {
  console.error('Database connection error', err)
})
