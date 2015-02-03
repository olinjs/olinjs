var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var exphbs  = require("express-handlebars");
var mongoose = require("mongoose");

var index = require("./routes/index");
var getCat = require("./routes/getCat");

var app = express();
mongoose.connect(process.env.MONGOURI || 'mongodb://localhost/test');
var PORT = 3000;

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", index.home);
app.get("/add", index.add);
app.get("/ingredients", index.ingredients);
app.get("/order", index.order);


app.listen(process.env.PORT || PORT);