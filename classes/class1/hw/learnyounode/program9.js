var http = require('http');
var concatStream = require('concat-stream');
var counter = 0;
var array = [];


function bigMan(index){

	http.get(process.argv[2+index], function (responce){

		responce.setEncoding('utf8');
		responce.pipe(concatStream(function (data){
			var stringData = data.toString();
			array[index] = stringData;
			counter++;

			if (counter == 3){
				array.forEach(function (urlString){
					console.log(urlString);
				})
			}
		}))
	})
}

for (var i=0; i<3; i++){
	bigMan(i)
}