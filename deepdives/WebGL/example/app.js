var express = require("express"),
  path = require("path");

var app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get('/obj', function(req, res) {
	var url = path.resolve(__dirname + '/obj.json');
	res.sendFile(url);
})

app.listen(3000, function(){
  console.log('Listening on Port 3000');
});
