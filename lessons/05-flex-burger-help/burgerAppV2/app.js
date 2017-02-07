var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var exphbs  = require("express-handlebars");
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/burger');

var index = require("./routes/index");
var outOfStock = require("./routes/outOfStock")

var app = express();

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", index.getIngredients);
app.get("/ingredients", index.getIngredients);
app.get("/order", index.getOrder);
app.get("/kitchen", index.getKitchen);
app.get("/flush", index.flush);
app.post("/", index.postAllIngredients);
app.post("/ingredients", index.postNewIngredients);
app.post("/stock", index.postOutOfStock);
app.post("/order", index.postAllIngredients);
app.post("/checked", index.postCheckedIngredient);
app.post("/order/new", index.postNewOrder);
app.post("/kitchen", index.postAllOrders);
app.post("/kitchen/refs", index.postRefIngredients);

var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log("Application running on port: ", PORT);
});
