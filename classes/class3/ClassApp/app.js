var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');

var index = require('./routes/index'); // import routes/index

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(logger('dev')); // Morgan takes parameters to specify details of logs
app.use(bodyParser.json()); //
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); //__dirname is name of process working directory.
// Any requests to our app will check through the public folder to find files. If no file found,
// only then will the request hit our routers. We may



app.get('/', index.home);

app.listen(3000);
