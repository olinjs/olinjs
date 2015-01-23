var http = require('http');
var concatStream = require('learnyounode/node_modules/concat-stream');

http.get(process.argv[2], function (response) {
	response.setEncoding('utf8');
	response.pipe(concatStream(function (data) {
		http.get(process.argv[3], function (response) {
			response.setEncoding('utf8');
			response.pipe(concatStream(function (data) {
				http.get(process.argv[4], function (response) {
					response.setEncoding('utf8');
					response.pipe(concatStream(function (data) {
						console.log(data);
					}))
				})
				console.log(data);
			}))
		})
		console.log(data);
	}))
})

// Official Solution

// var http = require('http')
// var bl = require('bl')
// var results = []
// var count = 0

// function printResults () {
//   for (var i = 0; i < 3; i++)
//     console.log(results[i])
// }

// function httpGet (index) {
//   http.get(process.argv[2 + index], function (response) {
//     response.pipe(bl(function (err, data) {
//       if (err)
//         return console.error(err)

//       results[index] = data.toString()
//       count++

//       if (count == 3)
//         printResults()
//     }))
//   })
// }

// for (var i = 0; i < 3; i++)
//   httpGet(i)
