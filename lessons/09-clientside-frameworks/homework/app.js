var express = require('express');
var path = require("path");
var index = require("./routes/index");
var todo = require("./routes/todo");
var bodyParser = require('body-parser');

var app = express();

var PORT = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", index.home);
app.use("/todo", todo);

app.listen(PORT, function() {
  console.log("Application running on port:", PORT);
});
