const mongoose = require('mongoose')
const md5 = require('md5');
const importProducts = require('./products');
const server = 'mongodb://mongo:27017'
const database = 'ishop';
const UserModel = require('./models/entities/Users')

mongoose.connect(`${server}/${database}`).then(() => {
  /*** Import products to MongoDB ***/
  importProducts.saveContent.then(res => {
    console.log('Saved products')
  }, err => console.log(err))

  /*** Create admin***/
  let user = new UserModel({login: "admin", password: md5("12345") })
  user.save()
  .then(doc => {
    console.log(doc)
  })
  .catch(err => {
    console.error(err)
  })  
})