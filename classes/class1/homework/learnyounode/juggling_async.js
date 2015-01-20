// var bl = require("bl");
// var http = require("http");


// var dataStr = [];

// function getFromUrl(url, callback) {
//     http.get(url, function _callback(response) {
//         response.pipe(bl(function (err, data) {
//             dataStr = dataStr.concat([data.toString()]);
//             callback();
//         }))
//     })
// }

// getFromUrl(process.argv[2], function callback(){
//     getFromUrl(process.argv[3], function callback() {
//         getFromUrl(process.argv[4], function callback() {
//             console.log(dataStr.join("\n"));
//         });
//     })
// })



var http = require('http')
var bl = require('bl')
var results = []
var count = 0

function printResults () {
  for (var i = 0; i < 3; i++)
    console.log(results[i])
}

function httpGet (index) {
  http.get(process.argv[2 + index], function (response) {
    response.pipe(bl(function (err, data) {
      if (err)
        return console.error(err)

      results[index] = data.toString()
      count++

      if (count == 3)
        printResults()
    }))
  })
}

for (var i = 0; i < 3; i++)
  httpGet(i)

