var http = require('http');
var port = Number(process.argv[2]);
var url = require('url');


function getResultNorm(date){
	return {"hour":date.getHours(), "minute":date.getMinutes(), "second":date.getSeconds()}
}

function getResultUnix(date){
	return {"unixtime":date.getTime()}
}

var server = http.createServer(function (request, responce){

	var urlParsed = url.parse(request.url, true);
	var date = new Date(urlParsed.query.iso);

	var resultDate;

	if (urlParsed.pathname='/api/parsetime'){
		resultDate = getResultNorm(date);
	}
	else if (urlParsed.pathname='/api/unixtime'){
		resultDate = getResultUnix(date);
	}

	if (resultDate){
		responce.writeHead(200, { 'Content-Type': 'application/json' });
		responce.end(JSON.stringify(resultDate));
	}
	else {
		responce.writeHead(404);
		responce.end();
	}

})

server.listen(port)