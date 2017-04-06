var mongoose = require('mongoose');

var todoSchema = {
	task: String,
	time: Number,
	status: String	
};

module.exports = mongoose.model("Todos", todoSchema);