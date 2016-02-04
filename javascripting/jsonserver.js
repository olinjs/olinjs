var http = require('http');
var moment = require('moment');
var port = process.argv[2];
var url = require('url');
var map = require('through2-map');

var server = http.createServer(function(req, res){
	var data ='';
	res.writeHead(200, { 'Content-Type': 'application/json' })  
	req.on('data', function(chunk){
			data+= chunk;
	})

	req.on('end', function(){
		var urlObj = url.parse(req.url, true);
		if (typeof urlObj.query.iso === 'string'){
			var recIso = moment(urlObj.query.iso);
			if (urlObj.pathname.split('/').pop() ==='unixtime'){
				res.write(JSON.stringify({
					unixtime: parseInt(recIso.format('x'))
				}));
			}
			else{
				res.write(JSON.stringify({
					hour: recIso.hour(),
					minute: recIso.minute(),
					second: recIso.second()
				}));
			}
		}
		res.end();
	})
	


	})

// var server = http.createServer(function(req, res){
// 	if (req.method == 'POST'){
// 		req.pipe(map(function(chunk){
// 			return chunk.toString().toUpperCase()
// 		})).pipe(res)
// 	}
// })

server.listen(port);