var mongoose   = require('mongoose');

var mongoURI = process.env.MONGOURI || "mongodb://olinjs_user:olinjs_password@ds053648.mongolab.com:53648/olinjs";
mongoose.connect(mongoURI);

module.exports = mongoose.connection;