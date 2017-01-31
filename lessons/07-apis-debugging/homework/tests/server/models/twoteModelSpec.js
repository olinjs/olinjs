require('./../../../app'); // to connect to the database
 // Setup our assertion library
var expect = require('chai').expect;
var mongoose = require('mongoose');

var Twote = require('./../../../models/twoteModel');

describe('Twote Model', function() {

 	 it('should create a new twote', function(done) {
 		
 		var twote = new Twote({
 			text: 'Cheese',
 			user: mongoose.Types.ObjectId('4edd40c86762e0fb12000003')
 		});

 		twote.save(function(err){
 			if (err){
 				return done(err);
 			} else {
 				done();
 			}
 		});
 	});
 	
	it('should remove all ingredients', function(done) {
 		Twote.findOneAndRemove({text: 'Cheese'},function(err,removed) {
 			if (err) {
 				return done(err);
 			}
 			if (removed == null) {
 				return done("no object found to remove!");
 			}
 			done();
 		});
	}); 	

});