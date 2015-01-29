var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');
var mongoose = require('mongoose');


var index = require('./routes/index');
var catroutes = require('./routes/catroutes');
var models = require('./modelsdb')

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log('Yay!')
    var Cat = models.catModel
});
mongoose.connect('mongodb://localhost/test');

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', index.home);

app.get('/cats/new', catroutes.makecat);
app.get('/cats/new', index.newcat); // display page with newly created cats

app.get('/cats', catroutes.allcats);
app.get('/cats', index.listcats); // display page which lists all cats

app.get('/cats/:color', catroutes.getcolorcats);
app.get('/cats/:color', index.listclrcats);


app.get('/cats/delete/old', catroutes.killcat); //curiousity
app.get('/cats/delete/old', index.rationalize);

app.listen(3002);
