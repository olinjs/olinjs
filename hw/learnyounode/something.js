// var net = require('net');
// var server = net.createServer(function (socket){
// 	var data = '';
// 	var date = new Date();
// 	var year = date.getFullYear();
// 	var month = date.getMonth();
// 	var day = date.getDate();
// 	month = month.toString() ;
// 	var hour = date.getHours();
// 	var minutes = date.getMinutes();
// 	data = year.toString()+ '-'+ month+'1'+'-'+day.toString()+' '+hour.toString()+':'+minutes.toString()+'\n';
// 	socket.write(data);
// 	socket.end();
// })
// server.listen(process.argv[2]);

// var http = require('http');
// var fs = require('fs');
// var server = http.createServer(function(request,response){
// 	var src = fs.createReadStream(process.argv[3]);
// 	src.pipe(response)
// })
// server.listen(process.argv[2]);

// var http = require('http');
// var map = require('through2-map');
// var server = http.createServer(function(request,response){
// 	request.pipe(map(function(chunk){
// 		return chunk.toString().split('').join('').toUpperCase();
// 	})).pipe(response)
// })
// server.listen(process.argv[2])

// var http = require('http');
// var map = require('through2-map');
// function parsetime(time){
// 	var date = new Date(time);
// 	return {
// 		hour: date.getHours(),
// 		minutes: date.getMinutes(),
// 		second: date.getSeconds()
// 	};
// }
// function unixtime(time){
// 	var date = new Date(time);
// 		return { unixtime: date.getTime() };
// }


// var server = http.createServer(function(request,response){
// 	var u = require('url').parse(request.url,true);
// 	// var date = new Date(u.query.iso);
// 	// console.log(endPoints[u.pathname](date));
// 	if (u.pathname === '/api/parsetime'){
// 		var f = parsetime;
// 	} else{
// 		f = unixtime;
// 	}
// 	response.writeHead(200,{'Content-Type':'application/json'});
// 	response.end(JSON.stringify(f(u.query.iso)));
// })

// server.listen(process.argv[2]);

