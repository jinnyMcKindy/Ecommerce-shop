const express = require('express');
const cors = require('cors')
const products = require('./server/models/products');
const app = express();
const db = require('./server/models/database');
const md5 = require('md5');
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors())

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

const hostname = '127.0.0.1';
const port = 3000;

//products.getContent.then = res => console.log(res), err => console.log(err)
//products.saveContent.then = res => console.log(res), err => console.log(err)

/*
db.saveUser({login: "admin", password: md5("12345") })
.then(data => console.log(data), err => console.log(err));
*/

app.get('/getProducts', cors(corsOptions), (req, res) => {
  products.getContent
    .then(data => res.json(data), err => res.json(err));
});
app.get('/getUsers', cors(corsOptions), (req, res) => {
  db.getUsers
    .then(data => res.json(data), err => res.json(err));
});
app.post('/saveOrder', (req, res) => {
	console.log(req.body)
	db.saveOrder(req.body.order)
	.then(data => res.json(data), err => res.json(err));    
});
app.get('/getOrders', cors(corsOptions), (req, res) => {
  db.getOrders
    .then(data => res.json(data), err => res.json(err));
});
app.listen(port);
