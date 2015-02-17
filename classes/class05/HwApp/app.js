var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var exphbs  = require("express-handlebars");

var tvvitter  = require("./routes/tvvitter");

var app = express();

var PORT = process.env.PORT || 3001

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", tvvitter.getHome);
app.get("/login", tvvitter.getLogin);

app.post("/login", tvvitter.postLogin);

app.post("/tvveet", tvvitter.postTvveet);
app.post("/delete", tvvitter.deleteTvveet);

app.listen(PORT, function() {
  console.log("App running on port:", PORT);
});
