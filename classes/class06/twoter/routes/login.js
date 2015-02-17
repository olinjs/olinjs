// Models
var Author = require('../models/author');
var Twote = require('../models/twote');

app.get('/login', function (req, res, next) {
	if (req.session.authorName != null) {
		res.redirect('/');
	} else {
  	res.render('login');
	}
});

// app.post('/login', passport.authenticate('local', {
// 	failureRedirect: '/login',
// 	successRedirect: '/'
// }));

app.post('/login', function (req, res){
	var name = req.body.name;
	var password = req.body.password;

	// Look if the user already exists.
	Author.find({$and: [
			{name: name},
			{password: password}
		]})
		.exec(function (err, authors){
			if (err) return console.error(err);
			// If not, let's make a new account.
			if (authors.length === 0) {

				// Change to tell the user to try again.
				console.log("Try again!");
			} else {
				req.session.authorName = authors[0].name;
				req.session.authorId = authors[0]._id;
				req.session.save();
				res.send('/');
			}
		});
});

app.post('/login/register', function (req, res){
	var authorName = req.body.name;
	var authorPass = req.body.password;

	// Look if the user already exists.
	Author.find({name: authorName})
		.exec(function (err, authors){
			if (err) return console.error(err);
			
			// If not, let's make a new account.
			if (authors.length === 0) {
				var newAuthor = new Author ({
					name: authorName,
					password: authorPass
				});
				newAuthor.save(function (err){
					if (err) return console.error(err);

					// Set the session to be the author name and id.
					req.session.authorName = newAuthor.name;
					req.session.save();
					Author.find({name: newAuthor.name})
						.exec(function (err, authors) {
							if (err) return console.error(err);
							req.session.authorId = authors[0]._id;
							req.session.save();
							res.send('/');
						});
				});
			} else {
				res.send("exists");
			}
		});
});

app.get('/logout', function (req, res){
	req.session.authorName = null;
	req.session.authorId = null;
	req.session.save();
	res.send('/login');
});

module.exports = app;