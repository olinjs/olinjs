var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var exphbs  = require("express-handlebars");
var mongoose = require('mongoose');
var session = require('client-sessions');

mongoose.connect('mongodb://localhost/twotter');

var index = require("./routes/index");

var app = express();

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
	cookieName: 'session',
	secret: 'random-string',
	duration: 30 * 60 * 1000,
	activeDuration: 5 * 60 * 1000,
}));

app.get("/", index.home);
app.get("/login", index.loginPage)
app.post('/login', index.loginAuthenticate)
app.post('/new', index.newTwote)
app.post('/delete', index.deleteTwote)

var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log("Application running on port: ", PORT);
});
