const mongoose = require('mongoose');

const { Schema } = mongoose;

const proteinSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  value: {
    type: Number,
    required: true,
    default: 0,
  }
});

const Protein = mongoose.model('Protein', proteinSchema);

module.exports = Protein;
