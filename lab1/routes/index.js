var path = require('path');

<<<<<<< HEAD
var routes = {};
=======
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { message: "WikiMVC!" });
});
>>>>>>> 5337d65ee2a20716ccda7d10632b21fa1b98dc6b

routes.home = function(req, res){
	res.sendFile('main.html', { root: path.join(__dirname, '../public') });
};
module.exports = routes;