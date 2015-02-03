var bl = require('bl');
var http = require('http');

function httpCollect(url, url2, url3){
	http.get(url, function (response){
		//response.setEncoding('utf8');
		response.pipe(bl(function(err, data){
			data = data.toString();
			console.log(data);

			http.get(url2, function (response2){
				//response.setEncoding('utf8');
				response2.pipe(bl(function(err2, data2){
					data2 = data2.toString();
					console.log(data2);

					http.get(url3, function (response3){
						//response.setEncoding('utf8');
						response3.pipe(bl(function(err2, data3){
							data3 = data3.toString();
							console.log(data3);
			
						}));
					})
			
				}));
			})
			
		}));
	})
}

httpCollect(process.argv[2], process.argv[3], process.argv[4]);

/*
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
    
          results[index] = data.toString() //THIS LINE IS WHY THIS TWERKS
          count++
    
          if (count == 3)
            printResults()
        }))
      })
    }
    
    for (var i = 0; i < 3; i++)
      httpGet(i)

*/