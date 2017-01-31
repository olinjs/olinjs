var mongoose = require('mongoose');

// Create a Schema
var orderSchema = mongoose.Schema({
  name: String,
  ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' }],
  total: Number,
  complete: { type: Boolean, default: false }
});

module.exports = mongoose.model("order", orderSchema);