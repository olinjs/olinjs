var home = function(req, res){
  res.render('home', {'classes': [
  	{name:'Olin.js', teacher:'All of those people'},
  	{name:'Italian', teacher:'Francesca'},
  	{name:'Chemistry', teacher:'Rob and Scott'},
  	{name:'UOCD', teacher:'SARA'}]
  });
};

module.exports.home = home;