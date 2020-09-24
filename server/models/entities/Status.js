const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statusSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  input: {
    type: Number,
    required: true
  }
}, { timestamps: true })

const Status = mongoose.model('Status', statusSchema);
module.exports = Status;