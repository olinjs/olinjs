var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');

var index = require('./routes/index');
var cat = require('./routes/cat');

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', index.home);
app.get('/cats', cat.catsList);
app.get('/cats/new', cat.catsNew);
app.get('/cats/bycolor/:color', cat.sortedWithColor);
app.get('/cats/delete/old', cat.deleteCat);

var mongoURI = process.env.MONGOURI || "mongodb://localhost/test";
mongoose.connect(mongoURI);

var PORT = process.env.PORT || 3006;

app.listen(PORT, function() {
  console.log("Application running on port:", PORT);
});