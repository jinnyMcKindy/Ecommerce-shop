const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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