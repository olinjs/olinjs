var mongoose = require('mongoose');

var mongoURI = process.env.MONGOURI || "mongodb://localhost/test";
mongoose.connect(mongoURI);


var castSchema = mongoose.Schema({
year: Number, //Year show started
show: String, //Name of show
members: [String] //Cast members
});


var Cast = mongoose.model('Cast',castSchema);

//All our actors
var actors = ['Adam Archer','Bob Biscuit','Chelsea Chalupa','Diana Dorkly','Edwardo Edwertin','Franklin Furter', 'Georgina Garlton', 'Heather Hatter'];

module.exports.casts = function(req,res){
	//Find all casts in database and display them sorted by year
	Cast.find({}).sort({year:1}).exec(function(err, casts){
		if(err){console.log(err);}
		res.render("casts",{'casts':casts});
	});
};

module.exports.newcast = function(req,res){
	//Create new cast member

	//1 to 4 cast members, random actors
	var members = [];
	for (var i = Math.floor(Math.random()*4) +1; i > 0; i--){
		var num = Math.floor(Math.random()*actors.length);
		if(!(members.indexOf(actors[num])>-1)){
			members.push(actors[num]);
		}else{
			i++;
		}
	}
	//Random yead and string for show name
	var year = Math.floor(Math.random()*65) + 1950;
	var name = Math.random().toString(36).replace(/[^a-z]+/g,'');

	var data = {'year':year,'show': name,'members':members};
	
	//Save new cast to db
	var newcast = new Cast(data);
	newcast.save(function(err){
		if(err){res.send("Failed")}
		res.render("casts",{casts:[data]});
	});

};

module.exports.bymember = function(req,res){
	//Find all casts in database with specified cast member and display them sorted by year
	Cast.find({members:req.params['0']}).sort({year:1}).exec(function(err, casts){
		if(err){console.log(err);}
		res.render("casts",{'casts':casts});
	});
};

module.exports.deleteold = function(req,res){
	//Delete the oldest cast in the db
	Cast.find({}).sort({year:1}).exec(function(err, casts){
		if(err){console.log(err);}
		if(casts[0]){
			Cast.findOneAndRemove({'_id':casts[0]._id},null,function(err,casts2){
				console.log(casts2);
				res.render("casts",{'casts':[casts2]});
			});
		}else{res.send("none left");}
	});
	
};