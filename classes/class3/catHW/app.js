var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
var exphbs = require('express-handlebars'); 

var index = require('./routes/index');
var Cat = require('./public/schema').Cat;
var rand = require('./public/randInt')

var names = ['Ben', 'Brosky', 'Evan S', 'TNatty', 'Joshe', 'Sarah'];
var colors = ['blue', 'green', 'red', 'orange', 'purple', 'green'];

var app = express();

var PORT = 3000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', index.home);

app.get('/cats', function(request, response) {
  response.send('yay lets print cats');
  Cat.find({})
    .sort({age: -1})
    .exec(function(err, cats) {
      console.log(cats);
    });
});

app.get('/cats/new', function(request, response) {
  var cat = new Cat({name: names[rand.randInt(names.length)],
              age: rand.randInt(100),
              color: colors[rand.randInt(colors.length)]
  });
  cat.save(function (err) {
    if (err) {
      console.log('Problem saving cat', err);
    }
  })
  response.send('Yay we made a cate');
});

app.get('/cats/delete/old', function(request, response) {
  Cat.findOneAndRemove({}, {sort: {age: -1}}, function (err, cat) {
    if (err) {
      response.send('you done goofed', err);
    } else if (!cat) {
      response.send('you already killed all the cats, you monster');
    } 
    else {
      response.send('we kill ze cat');
    }
  });
});

app.get('/cats/bycolor/:color', function(request, response) {
  var byColor = request.params.color;
  Cat.find({color: byColor})
    .sort({age: -1})
    .exec(function(err, cats) {
      console.log(cats);
    });
});

app.listen(PORT);