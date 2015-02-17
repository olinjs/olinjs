// Models
var Author = require('../models/author');
var Twote = require('../models/twote');

var sendTwotes = function (res){
	Twote.find()
		.sort({_id: -1})
		.exec(function (err, twotes) {
			res.render("partials/twote", {
				layout: false,
				twotes: twotes
			});
		});
};

var sendAuthors = function (res){
	Author.find()
		.sort({name: 1})
		.exec(function (err, authors) {
			res.render("partials/author", {
				layout: false,
				authors: authors
			});
		});
}

app.get('/', function(req, res, next) {

	var is_ajax_request = req.xhr;
	if (is_ajax_request) {
		sendTwotes(res);
	} else {

		// Check to see if user can see the page.
		if (req.session.authorName == null) {
			res.render('main', {
				isAuthenticated: req.isAuthenticated(),
				user: req.user,
				authorLoggedIn: false
			});
		} else {
		  res.render('main', {
		  	isAuthenticated: req.isAuthenticated(),
		  	user: req.user,
		  	authorName: req.session.authorName,
				authorLoggedIn: true
		  });
		}
	}
});

app.post('/', function (req, res) {
	var newTwote = new Twote({
		twote: req.body.twote,
		authorName: req.session.authorName,
		authorId: req.session.authorId
	});

	newTwote.save(function (err) {
		if (err) return console.error(err);
  	sendTwotes(res);
	});
});

app.post('/deleteTwote', function (req, res){
	var deleteThisTwote = req.body.deleteThisTwote;

	Twote.find({ _id: deleteThisTwote }).remove()
		.exec(function (err){
			if (err) return console.error(err);
			sendTwotes(res);
		});
});

app.get('/authors', function (req, res){
	sendAuthors(res);
});

module.exports = app;