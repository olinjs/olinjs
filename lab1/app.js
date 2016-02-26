var express = require('express');
var path = require("path");
var index = require("./routes/index");
var todo = require("./routes/todo");
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var index = require('./routes/index');
var wiki = require('./routes/wiki');
var app = express();

var app = express();

var PORT = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, "public")));

//database setup
mongoose.connect('mongodb://localhost/pagebase');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', index);
app.get('/getlink', wiki.getlink);
app.post('/addlink', wiki.addlink);
app.post('/editlink', wiki.editlink);

app.listen(PORT, function() {
  console.log("Application running on port:", PORT);
});
