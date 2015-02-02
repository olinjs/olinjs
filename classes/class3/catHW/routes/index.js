var Cat = require('./../public/schema').Cat;
var rand = require('./../public/rand');

var names = ['Ben', 'Brosky', 'Evan S', 'TNatty', 'Joshe', 'Sarah'];
var colors_list = ['blue', 'green', 'red', 'orange', 'purple', 'green'];

var home = function(request, response) {
  response.render("home");
}

var allcats = function(request, response) {
  Cat.find({})
    .sort({age: -1})
    .exec(function(err, cats) {
    var err = '';
      if (err) {
        response.send('The cats could not be displayed :(', err);
      } else {
        response.render("allcats", {cats: cats});
      }
    });
}

var create = function(request, response) {
  var cat = new Cat({name: names[rand.randInt(names.length)],
              age: rand.randInt(20),
              colors: rand.subArray(colors_list)
  });
  cat.save(function (err) {
    if (err) {
      console.log('Problem saving cat', err);
    }
  })
  response.render('create', {cat: cat});
}

var old = function(request, response) {
  Cat.findOneAndRemove({}, {sort: {age: -1}}, function (err, cat) {
    if (err) {
      response.send('you done goofed', err);
    } else if (!cat) {
      response.send('you already killed all the cats, you monster');
    } 
    else {
      response.render('old', {cat: cat});
    }
  });
}

var bycolor = function(request, response) {
  // need to use substring so color isn't :purple or :green, etc
  var my_color = request.params.color.substring(1);
  Cat.find({colors: my_color})
    .sort({age: -1})
    .exec(function(err, cats) {
      if (err) {
        response.send('The cats could not be displayed :(', err);
      } else {
        response.render("bycolor", {cats: cats});
      }
    });
}

module.exports.home = home
module.exports.allcats = allcats;
module.exports.create = create;
module.exports.old = old;
module.exports.bycolor = bycolor;