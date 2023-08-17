const mongoose = require('mongoose');

const { Schema } = mongoose;
//make sure these are pointing to the values not the object id?
const pairingSchema = new Schema({
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Protein',
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Sauce',
    required: true
  }
});

const Pairing = mongoose.model('Pairing', pairingSchema);

module.exports = Pairing;
