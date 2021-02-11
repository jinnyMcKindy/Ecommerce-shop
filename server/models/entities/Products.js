const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/**
 * @param  {type:String} price
 * @param  {type:String} title
 * @param  {type:String} imageSrc
 * @param  {type:String} productLink
 * @param  {type:Date} timestamps
 */
const productSchema = new Schema({
  price: {
    type: String,
    required: false
  },
  title: {
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