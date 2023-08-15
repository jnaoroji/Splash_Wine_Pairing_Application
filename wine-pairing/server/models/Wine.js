const mongoose = require('mongoose');

const { Schema } = mongoose;

const wineSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  vintage: {
    type: String,
  },
  varietal: {
    type: String
  },
  region: {
    type: String,
  },
  image: {
    type: String
  },
  tastingNote: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0.99
  },
  quantity: {
    type: Number,
    min: 0,
    default: 0
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
});

const Wine = mongoose.model('Wine', wineSchema);

module.exports = Wine;