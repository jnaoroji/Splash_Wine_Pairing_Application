const mongoose = require('mongoose');

const { Schema } = mongoose;

const sauceSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  value: {
    type: Number,
    required: true,
    default:0,
  }
});

const Sauce = mongoose.model('Sauce', sauceSchema);

module.exports = Sauce;
