var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var ReactDOM = require('react-dom');
var app = express();
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');

var index = require('./routes/index');


app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

mongoose.connect('mongodb://localhost/todos');

//Routes for our backend models
app.get('/home', index.home);
app.post('/add', index.add);
app.post('/status', index.changeStatus);
app.post('/edit', index.edit);
app.post('/remove', index.remove);


app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
