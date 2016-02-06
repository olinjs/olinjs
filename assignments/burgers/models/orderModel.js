var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
    name: String,
    ingredients: [{type: mongoose.Schema.Types.ObjectId, ref: 'ingredient'}],
    completed: {type: Boolean, default: false}
});

module.exports = mongoose.model('order', orderSchema);