var express = require('express');
var app = express();

var path = require('path')
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index.js')
var exphbs = require('express-handlebars');
var PORT = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/',function(req,res){
	res.render("home",{'paths':['/casts','/casts/new','/casts/bymember/Adam Archer','/casts/delete/old']});
});

app.get('/casts', index.casts);
app.get('/casts/new', index.newcast);
app.get('/casts/bymember/*', index.bymember);
app.get('/casts/delete/old', index.deleteold);


app.listen(PORT);

