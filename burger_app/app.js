var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var exphbs  = require("express-handlebars");

var index = require("./routes/index");
var getIngredient = require("./routes/getIngredient.js");
var orders = require("./routes/orders.js");
var Ingredients = require("./models/ingredientModel");
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost/ingredients');

var PORT = 3000;

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/ingredients", getIngredient.ingredients);
app.post("/postIngredient", getIngredient.addIngredient);
app.post("/outIngredient", getIngredient.outIngredient);
app.post("/editIngredient", getIngredient.editIngredient);
app.get("/order", orders.orders);
app.post("/checkbox", orders.checkbox);
app.post("/newOrder",orders.newOrder);
app.get("/kitchen",orders.showList);
app.post("/removeOrder",orders.removeOrder);

app.listen(PORT, function() {
  console.log("App running on port:", PORT);
});
