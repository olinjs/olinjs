var express = require('express')
  , http = require('http')
  , https = require('https')
  , path = require('path')
  , request = require('request')
  , text = require('./util/text.js')
  , handlebars = require('express-handlebars');
  
var app = express();

app.set('port', process.env.port || 3000);
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'handlebars');

// Our home page route
app.get('/', function(req, res){
  res.render('index');
});

app.get('/tweets', function(req, res){
  var tweetText;
  
  var query = req.query.q;
    
  var twitterAPIHost = 'https://api.twitter.com' 
  var twitterConsumerKey = process.env.TWITTER_KEY;
  var twitterConsumerSecret = process.env.TWITTER_SECRET;
  var credentials = new Buffer(twitterConsumerKey+":"+twitterConsumerSecret).toString('base64');
  var postData = "grant_type=client_credentials";
  var postOptions = {
    url: twitterAPIHost+'/oauth2/token',
    headers: {
      'Host': 'api.twitter.com',
      'Authorization': 'Basic ' + credentials,
      'content-type' : 'application/x-www-form-urlencoded',
      'Content-Length': postData.length
    },
    body: postData
  };

  request.post(postOptions, function(err, resp, body){
    var bearer_token = JSON.parse(body).access_token;
    var getOptions = {
      url: 'https://api.twitter.com/1.1/search/tweets.json?q='+query,
      headers: {
        'Host': 'api.twitter.com',
        'Authorization': 'Bearer '+bearer_token
      }
    };

    request.get(getOptions, function(err, resp, body){
      var words = [];
      JSON.parse(body).statuses.forEach(function(val, i, arr){
        words.pushArray(val.text.split(' '));
      });
      var word_freqs = JSON.stringify(text.generateWordFreqs(words));
      res.json(word_freqs);
    });
  });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port", app.get('port'))
});


Array.prototype.pushArray = function() {
  var toPush = this.concat.apply([], arguments);
  for (var i = 0, len = toPush.length; i < len; ++i) {
    this.push(toPush[i]);
  }
};
