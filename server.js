const express = require('express');
var cors = require('cors')

var corsOptions = {
  origin: 'http://localhost:8081',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
const app = express();

const products = require('./server/models/products');
// const file = require('./server/models/File');

const hostname = '127.0.0.1';
const port = 3000;

// products.getContent.then = res => console.log(res), err => console.log(err)
products.saveContent.then = res => console.log(res), err => console.log(err)
app.get('/getProducts', cors(corsOptions), (req, res) => {
  products.getContent
    .then(data => res.json(data), err => res.json(err));
});

app.listen(port);
