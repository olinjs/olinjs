var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var index = require('./routes/index');

var PORT = process.env.PORT || 3000;

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', index.home);
app.get('/cats', index.cats);
app.get('/cats/new', index.newcat);
app.get('/cats/bycolor/:color', index.bycolor);
app.get('/cats/delete/old', index.old);

app.listen(PORT, function() {
  console.log("Application running on port:", PORT);
});