var express = require('express');
var index = require('./routes/index');
var exphbs = require('express-handlebars');
var favicon = require('serve-favicon');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.get('/', index.home);

app.listen(3000);