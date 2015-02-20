//console.log('HELLO WORLD');
/*var total = 0;
for (var i = 2;i < process.argv.length; i++){
	total += Number(process.argv[i])
}
console.log(total);*/
/*var fs = require('fs');
var file = fs.readFileSync(process.argv[2]);
console.log(file.toString().split('\n').length - 1);*/

/*var fs = require('fs');
function cb (err,file){
	console.log(file.toString().split('\n').length - 1);
}
fs.readFile(process.argv[2],cb);*/

/*var fs = require('fs');
function cb(err,list){
	console.log(list.filter(function(file){
		return file.slice(-3) === '.'+ext;
	}).join('\n'));
}
fs.readdir(process.argv[2],cb)
*/

/*var mod = require('./module.js');
function cb (err,data){
	console.log(data.join('\n'));
}
mod(process.argv[2],process.argv[3],cb);
*/

/*var http = require('http');
var alldata = ''
	http.get(process.argv[i+2],function (res){
		res.on('data',function(data){
			alldata += data
		}).setEncoding('utf8');
		res.on('end',function(){
			console.log(alldata.length);
			console.log(alldata);
		});
	});
*/

/*var http = require('http');
var arr = ['','','']
count = 0
function fun(i){
	http.get(process.argv[i+2],function (res){
		res.on('data',function(data){
			arr[i] += data
		}).setEncoding('utf8');
		res.on('end',function(){
			count++;
			if (count>=3){
				console.log(arr.join("\n"))
			}
		});
	});
}
for(var i = 0;i<3;i++){
	fun(i);
}*/

/*var net = require('net');
var serv = net.createServer(function(socket){
	var date = new Date();
	var str = date.getFullYear().toString()+"-0"+(date.getMonth()+1).toString()+"-"+date.getDate().toString()+" "+date.getHours().toString()+":"+date.getMinutes().toString();
	socket.write(str);
	socket.end();
});
serv.listen(process.argv[2]);*/

/*var http = require('http');
var fs = require('fs');
var stream = fs.createReadStream(process.argv[3]);
var serv = http.createServer(function(req,res){
	stream.pipe(res);
});
serv.listen(process.argv[2]);*/

/*var http = require('http');
var map = require('through2-map')
var serv = http.createServer(function(req,res){
    req.pipe(map(function (chunk) {
      return chunk.toString().toUpperCase()
    })).pipe(res)

});
serv.listen(process.argv[2]);*/

var http = require('http');
var url = require('url');
var serv = http.createServer(function(req,res){
	var reqdata = url.parse(req.url,true);
	console.log(reqdata);
	var date = new Date(reqdata['query']['iso']);
	res.writeHead(200, { 'Content-Type': 'application/json' })
	if(reqdata['pathname'] === '/api/parsetime'){
		console.log(JSON.stringify({'hours':date.getHours(),'minute':date.getMinutes(),'second':date.getSeconds()}));
		res.write(JSON.stringify({'hour':date.getHours(),'minute':date.getMinutes(),'second':date.getSeconds()}));
	}else if(reqdata['pathname'] === '/api/unixtime'){
		res.write(JSON.stringify({'unixtime':date.getTime()}));
	}	
	res.end();

});
serv.listen(process.argv[2]);