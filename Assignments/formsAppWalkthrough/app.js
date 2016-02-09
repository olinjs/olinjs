var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var exphbs  = require("express-handlebars");
var index = require("./routes/index");
var app = express();
var PORT = 3000;
var mongoose = require('mongoose');
/* CONNECT TO MONGOOSE */
mongoose.connect(process.env.MONGOURI || 'mongodb://localhost/test');
var getIngredients = require("./routes/getIngredients");
var orders = require("./routes/orders");
var kitchen = require("./routes/kitchen");



app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", index.home);
app.get("/ingredients", getIngredients.getIngredients);
app.post("/addIngredients", getIngredients.addIngredients);
app.post("/updateIngredients", getIngredients.updateIngredients);
app.post("/deleteIngredients", getIngredients.deleteIngredients);
app.post("/outofStockIngredients", getIngredients.outofStockIngredients);
app.post("/inStockIngredients", getIngredients.inStockIngredients);

app.get("/orders", orders.getOrders);
app.post("/placeOrders", orders.placeOrders);

app.get("/kitchen", kitchen.getOrders);
app.post("/completeOrders", kitchen.completeOrders);

app.listen(PORT, function() {
  console.log("App running on port:", PORT);
});
