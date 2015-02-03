var mongoose = require('mongoose');
var mongoURI = process.env.MONGOURI || "mongodb://localhost/test"
mongoose.connect(mongoURI);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    //
});

var catSchema = mongoose.Schema({
	name: String,
	age: Number,
	color : String
})

exports.Cat = mongoose.model('Cat', catSchema);