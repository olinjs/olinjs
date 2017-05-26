var mongoose = require('mongoose');

var catName = ['Gizmo', 'Beauregard', 'Baby Girl', 'Han Solo', 'Trisha', 'Quat', 'Arbitration', 'Darth', 'Saint Ashlar', 'Willa Catter',
	'Curtains', 'Seurat', 'Fox', 'Possum' ,'Akeisha','Manuel','Nika','Rossini','Teddy Bear','Katman','Pooker','Jack Sparrow','Gecko','Tanier','Berkeley'];
var catColors = ['brown', 'red', 'black', 'white', 'grey', 'orange', 'yellow'];

var Cat = mongoose.model('Cat',{
	age: Number,
	name: String,
	color: [String]
});

var cats = {};

cats.newCat = function(req, res){
	var colorList = [];
	for (var i = 0; i < Math.floor(Math.random()*3)+1; i++) {
    	colorList.push(catColors[Math.floor(Math.random()*catColors.length)]);

  }
  console.log(colorList);
var inputCat = new Cat({
	age: Math.floor(Math.random()*14),
	name: catName[Math.floor(Math.random()*catName.length)],
	color: colorList
});

inputCat.save(function (err) {
  if (err){
  	console.log('New cat not created');
  	res.status(500).send('cat created');
  } else{
  	console.log('New cat created');
  	res.render('cats', {
  		message: 'new cat created'
  	});
  }
});

};

cats.dispCat = function(req, res){

	Cat.find().sort({age:-1}).exec(function(err, results){
		if (err){
			res.status(500).send('displaying cat didnt work');
		}else {
			res.render('cats', {
				message: 'Cats sorted by age',
				cats: results
			});
		}
	})

};

cats.dispByColor = function(req, res){

	Cat.find({color: req.params.color}).sort({age:-1}).exec(function(err, results){
		if (err){
			res.status(500).send('finding cats by color didnt work');
		}else {
			res.render('cats', {
				message: 'Cats with color by age',
				cats: results
			})
		}
	})

};

cats.deleteCat = function (req, res) {
	Cat.findOneAndRemove({}, {sort: {age:-1}}, function(err, result){
		if (err){
			res.status(500).send('cat not sent to die');
		} else{
			res.render('cats', {
				message: 'cat died'
			});
		}
	}) 
};


module.exports = cats;
