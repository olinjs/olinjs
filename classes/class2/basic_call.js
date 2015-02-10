module.exports = function duckCount() {
  return Array.prototype.slice.call(arguments).filter(function(potentialDuck) {
    return Object.prototype.hasOwnProperty.call(potentialDuck, 'quack')
  }).length;
};

// function duckCount() {
// 	var args = Array.prototype.slice.call(arguments);
	
// 	var recursiveDuck = function (totalDucks, args) {

// 		if (args.length === 1) {
// 			console.log(totalDucks);
// 			return totalDucks;
// 		}

// 		if (Object.prototype.hasOwnProperty.call(args[0], 'quack')) {
// 			recursiveDuck(totalDucks + 1, args.slice(1));
// 		} else {
// 			recursiveDuck(totalDucks, args.slice(1));
// 		}
// 	};

// 	return recursiveDuck(0, args);

// }

// // duckCount({'quack': 1}, {'quack': 1}, {'quack': 1}, {'quack': 1}, {'quack': 1});

// module.exports = duckCount;