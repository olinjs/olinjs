require('./../../../app'); // to connect to the database
var expect = require('chai').expect;
var Ingredient = require('./../../../models/ingredientModel');
var Order = require('./../../../models/orderModel');

describe('Ingredient Model', function() {
  it('should create a new ingredient', function(done) {
    var ingr = new Ingredient({
      name: 'Basil',
      price: 11,
    });
    ingr.save(function(err) {
      if (err) {
        return done(err);
      }
      done();
    });
  });

  // What else can you test?

  it('should remove an ingredient by name', function(done) {
    Ingredient.remove({ name: 'Basil' }, function(err) {
      if (err) {
        return done(err);
      }
      done();
    });
  });
});


describe('Order Model', function() {
  it('should create a new order', function(done) {
    var ingr = new Order({
      name: 'Sam',
      ingredients: []
    });
    ingr.save(function(err) {
      if (err) {
        return done(err);
      }
      done();
    });
  });

  // What else can you test?

  it('should remove an order by name', function(done) {
    Order.remove({ name: 'Sam' }, function(err) {
      if (err) {
        return done(err);
      }
      done();
    });
  });
});