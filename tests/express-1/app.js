var express = require('express');
var app = express();

app.get('/', function(req, res){
    res.send('Hello world.');
});

app.get('/moose', function(req, res){
    res.send('Do you like moose? I do.')
})

app.get('/olin', function(req, res){
    res.send('Hi Olin!')
})

app.get('/moose/fears', function(req, res){
    res.send('Moose can be scary bastards.')
})

app.listen(3000);
