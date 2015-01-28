var express = require('express');
var app = express();

var mongoURI = process.env.MONGOURI || "mongodb://localhost/test";
mongoose.connect(mongoURI);

app.get('/', function(req, res){
  res.send('hello world');
});

app.listen(3000);