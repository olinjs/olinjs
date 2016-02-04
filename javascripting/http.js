var http = require('http');
function httpGet() {
    //console.log(process.argv[2]);
    http.get(process.argv[2], function(response){
	response.setEncoding('utf8').on('data', function(data){
		console.log(data);
	}).on('error', function(err){
		console.log('err');
	})
})}

httpGet();