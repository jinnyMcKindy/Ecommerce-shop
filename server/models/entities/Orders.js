const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/**
 * @param  {type:String} phone
 * @param  {type:String} address
 * @param  {type:Number} index
 * @param  {type:String} city
 * @param  {type:String} country
 * @param  {type:String} email
 * @param  {type:String} name
 * @param  {type:Array} products
 * @param  {type:Number} totalPrice
 * @param  {type:Date} timestamps
 */
const orderSchema = new Schema({
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  index: {
    type: Number,
    required: false
  },
  city: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  name:{
    type: String,
    required: true
  },
  products: {
    type: Array,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  }
}, { timestamps: true })

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;