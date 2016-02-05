var express = require("express");
var path = require("path");
var exphbs  = require("express-handlebars");

var index = require("./routes/index");

var app = express();

var PORT = 3000;

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", index.home);

app.listen(PORT, function() {
  console.log("App running on port:", PORT);
});
