const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  wines: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Wine'
    }
  ]
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
