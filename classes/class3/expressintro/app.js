
var express = require('express');
var index = require('./routes/index');
var app = express();

app.get('/', index.home);

app.listen(3000);