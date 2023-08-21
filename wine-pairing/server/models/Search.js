const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const searchSchema = new Schema({
  searchProtein: {
    type: String,
    required: 'Please select a protein!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  searchSauce: {
    type: String,
    required: 'Please select a sauce!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  // searchPairing:{
  //   type: String,
  // }
  
});

const Search = model('Search', searchSchema);

module.exports = Search;
