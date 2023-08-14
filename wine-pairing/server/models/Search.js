const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const searchSchema = new Schema({
  searchText: {
    type: String,
    required: 'Your search term is invalid!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  
});

const Search = model('Search', searchSchema);

module.exports = Search;
