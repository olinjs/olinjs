mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
    ingredients: [String],
});

module.exports = mongoose.model('order',orderSchema);
