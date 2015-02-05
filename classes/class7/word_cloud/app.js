var express = require('express')
  , http = require('http')
  , path = require('path')
  , handlebars = require('express-handlebars')
  , OAuth = require('oauth');
  
var app = express();

app.set('port', process.env.port || 3000);
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'handlebars');

// Our home page route
app.get('/', function(req, res){
  res.render('index');
});

// Complete this route so that it will
// use the OAuth package to request an
// access token from Facebook.
// Docs: https://www.npmjs.com/package/oauth
app.get('/authorize', function(req, res){
  
});

app.get('/callback', function(req, res){
  
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port", app.get('port'))
});
