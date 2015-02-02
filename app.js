var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var exphbs  = require("express-handlebars");

var index = require("./routes/index");
var kitchen  = require("./routes/kitchen");

var app = express();

var PORT = process.env.PORT || 3000

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", kitchen.getIngredients);
app.get("/ingredients", kitchen.getIngredients);
app.get("/order", kitchen.newOrder);
app.get("/kitchen",kitchen.getOrders);

app.get("/postIngredient", kitchen.postIngredient);

app.listen(PORT, function() {
  console.log("App running on port:", PORT);
});
