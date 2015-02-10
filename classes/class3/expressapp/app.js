var express = require('express');
var app = express();

var path = require('path')
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index.js')
var exphbs = require('express-handlebars');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', index.home);
app.post('/',function(req,res){
	res.send('Yay')
});


app.get('/test', function(req,res,next){
	res.send('')
});

app.listen(3000);

