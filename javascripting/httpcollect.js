var http = require('http');
var bl = require('bl');
function httpGet() {
    //console.log(process.argv[2]);
    http.get(process.argv[2], function(response){
	response.pipe(bl(function (err, data){
		console.log(data.toString().length);
		console.log(data.toString());
	})).on('error', function(err){
		console.log('err');
	})
})}

httpGet();