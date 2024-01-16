// models/cartSchema.js
const mongoose = require('mongoose');

const cartschema = new mongoose.Schema({
  product: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Product",
    required: true
  },
  quantity: { 
    type: Number, 
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

const Cart = mongoose.model('Cart', cartschema);

module.exports = Cart;
