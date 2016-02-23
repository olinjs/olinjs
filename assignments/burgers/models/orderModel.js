var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
    name: String,
    //I think you just made a typo here. populate should now work.
    ingredients: [{type: mongoose.Schema.ObjectId, ref: 'ingredient'}], 
    completed: {type: Boolean, default: false}
});

module.exports = mongoose.model('order', orderSchema);