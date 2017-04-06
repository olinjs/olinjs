var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var exphbs  = require("express-handlebars");
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/burger');

var index = require("./routes/index");
var getIngredients = require("./routes/getIngredients");
var outOfStock = require("./routes/outOfStock")

var app = express();

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", index.home);
app.get("/ingredients", getIngredients.getIngredients);
app.post("/ingredients", getIngredients.postIngredients);
app.post("/stock", outOfStock.postOutOfStock);

var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log("Application running on port: ", PORT);
});
