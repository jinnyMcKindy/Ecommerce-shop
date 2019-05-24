const http = require('http');
const products = require('./server/models/products');

const hostname = '127.0.0.1';
const port = 3000;

products.getContent.then((res) => {
  console.log(res);
});
/*
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  //res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.setHeader('Content-Type', 'application/json; charset=utf-8')

  products.parseFile().then((data) => {
     res.end(data.body);
  },(error)=>{
    console.log(error)
  })

})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
*/
