var home = function(req, res){
	var isChristmas;
	isChristmas = checkIfChristmas();
	res.render("home", {"isChristmas": isChristmas});
};

function checkIfChristmas(isChristmas) {
	var today = new Date();
	var day = today.getDate();
	var month = today.getMonth();
	return (month == 11 && day == 25) ? "YES IT'S CHRISTMAS GODDAM" : "NO IT'S NOT YOU DUMMY";
}

module.exports.home = home;