var express = require("express"),
  path = require("path"),
  handlebars = require('express-handlebars'),
  bodyParser = require('body-parser'),
  session = require('express-session');

var app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.use(session({ secret: 'this is not a secret ;)',
	cookie:{},
	resave: false,
	saveUninitialized: false }));
app.set('view engine', 'handlebars');

app.get("/login", function(req, res) {
	res.render('login');
});

app.get("/", function(req, res){
	var sess = req.session;
	console.log(sess);
	if (!sess.username) {
		res.redirect("/login");
	} else {
		var time = new Date(Date.now() + 60000);
		sess.cookie.expires = time;
		res.render('index', {name: sess.username, time: time}, function(err, html) {
			if (err) {
				console.log(err);
			}
			res.send(html);
		});
	}
});

app.post("/login", function(req, res) {
	var sess = req.session;
	sess.username = req.body.name;
	res.redirect('..'); 
})

app.listen(3000);
console.log('Listening on Port 3000');