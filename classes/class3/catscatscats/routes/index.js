var url = require('url');
var path = require('path');
var mgFuncs = require('./mg_funcs');

// GET functions

var home = function(req, res){
  res.render('home');
};


var catsNew = function(req, res){
  cat = mgFuncs.addCat();
  res.render('newCat', {cat: cat});
};


var cats = function(req, res){
  mgFuncs.allCats(res);
};

var catsByColor = function(req, res){
  console.log('Requested color: ' + req.params['0']);
  //res.render('byColor', {'cats': mgFuncs.allCats()});
  mgFuncs.catsByColor(res, req.params['0']);
};


var catsDelete = function(req, res){
  mgFuncs.deleteOldest(res);
};

var pickColor = function(req, res) {
  mgFuncs.pickColor(res);
}

module.exports.home = home;
module.exports.catsNew = catsNew;
module.exports.cats = cats;
module.exports.catsByColor = catsByColor;
module.exports.catsDelete = catsDelete;
module.exports.pickColor = pickColor;