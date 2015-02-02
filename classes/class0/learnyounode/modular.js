var module = require('./module.js');

function printStuff(err, filtered) {
	if (err) {
		return console.error('There was an error: ', err);
	}

	for (var i = 0; i < filtered.length; i++) {
        console.log(filtered[i]);
    }
}

module(process.argv[2], process.argv[3], printStuff);

// Official Solution

// var filterFn = require('./solution_filter.js')
// var dir = process.argv[2]
// var filterStr = process.argv[3]

// filterFn(dir, filterStr, function (err, list) {
//   if (err)
//     return console.error('There was an error:', err)

//   list.forEach(function (file) {
//     console.log(file)
//   })
// })
