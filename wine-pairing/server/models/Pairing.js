const mongoose = require('mongoose');

const { Schema } = mongoose;
//make sure these are pointing to the values not the object id?
const pairingSchema = new Schema({
  category: [
  {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
],
  protein: {
    type: Schema.Types.ObjectId,
    ref: 'Protein',
    required: true
  },
  sauce: {
    type: Schema.Types.ObjectId,
    ref: 'Sauce',
    required: true
  }
});

const Pairing = mongoose.model('Pairing', pairingSchema);

module.exports = Pairing;
