var express = require('express');
var path = require("path");
var index = require("./routes/index");

var app = express();

var PORT = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, "public")));

app.get("/", index.home);

app.listen(PORT, function() {
  console.log("Application running on port:", PORT);
});
