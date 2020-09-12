const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  price: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  imageSrc: {
    type: String,
    required: true
  },
  productLink: {
    type: String,
    required: true
  }
}, { timestamps: true })

const Product = mongoose.model('Product', productSchema);
module.exports = Product;