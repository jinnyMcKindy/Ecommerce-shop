const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  price: {
    type: String,
    required: false
  },
  name: {
    type: String,
    required: false
  },
  imageSrc: {
    type: String,
    required: false
  },
  productLink: {
    type: String,
    required: false
  }
}, { timestamps: true })

const Product = mongoose.model('Product', productSchema);
module.exports = Product;