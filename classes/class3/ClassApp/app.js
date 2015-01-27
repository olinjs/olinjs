var express = require('express');
var app = express();

app.get('/', function(req, res){
    res.send('Hello world.');
});

app.get('/olin', function(req, res){
    res.send('Hi Olin!');
})

app.post('/chelsea', function(req, res){
    res.send('YAY!');
})


app.listen(3000);
