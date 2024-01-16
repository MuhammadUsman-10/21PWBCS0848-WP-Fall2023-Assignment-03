const mongoose = require('mongoose');

// Define Product Schema
const productschema = new mongoose.Schema({
  Name: {
    type: String,
    required: true
  },
  Category: String,
  Price: {
    type: Number,
    required: true
  },
  imageUrl: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Define Product model
const Product = mongoose.model('Product', productschema);

module.exports = Product;
