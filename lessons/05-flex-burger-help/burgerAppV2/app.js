/*Great separation of parts in this file. It might be good to have comments for each part (middleware, routes, port-related information)*/
var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var exphbs  = require("express-handlebars");
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/burger');

var index = require("./routes/index");
var outOfStock = require("./routes/outOfStock") //do you use this file? remove it if not

var app = express();

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/*Another way of separating routes by grouping them by different api's. Maybe separate routes by ingredients, kitchen-related routes and order-related routes. You would use app.use('/api/ingredients', ingredients) in here, and then in your routes/ingredients.js file:

  const router = express.Router();

  router.get('/stock', function (req, res) {

  }) */

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

var PORT = process.env.PORT || 3000; //good port practice
app.listen(PORT, function() {
  console.log("Application running on port: ", PORT);
});
