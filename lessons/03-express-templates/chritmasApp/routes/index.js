

var home = function(req, res){
	var date = new Date();
	var christmas;

	if (date.getMonth() === 11 && date.getDate() === 26){
		christmas = 'YES';
	} else {
		christmas = 'NO';
	}
  res.render('home', {'answer': christmas
  });
};

module.exports.home = home;