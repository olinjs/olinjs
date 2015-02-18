var express = require('express');
var path = require('path');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var funs = require('./funs');

var app = express();
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var mongoURI = process.env.MONGOURI || "mongodb://localhost/test";
var PORT = process.env.PORT || 3000;
mongoose.connect(mongoURI);

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/cats/new', funs.newCat)
app.get('/cats', funs.home)
app.get('/cats/bycolor/:color', funs.sortColor)
app.get('/cats/delete/old', funs.removeCat)


app.listen(PORT, function() {
  console.log("Application running on port:", PORT);
});