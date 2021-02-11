const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/**
 * @param  {type:String} login
 * @param  {type:String} password
 * @param  {type:Date} timestamps
 */
const userSchema = new Schema({
  login: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true })

const User = mongoose.model('User', userSchema);
module.exports = User;