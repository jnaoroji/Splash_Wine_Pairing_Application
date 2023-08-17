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
  }
});

const Sauce = mongoose.model('Sauce', sauceSchema);

module.exports = Sauce;
