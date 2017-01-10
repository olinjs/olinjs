var exphbs = require('express-handlebars');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
var index = require('./routes/index');
var app = express();
var routes = require('./routes/index');


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './public')));


app.get('/', routes.home);
app.get('/cats/new', routes.getNewCat);
app.get('/cats', routes.getAllCats);
app.get('/cats/bycolor/:color', routes.getCatColor);
app.get('/cats/delete/old', routes.deleteCat);

app.listen(3000);

// your app.js looks great! Well-organized and clear.
