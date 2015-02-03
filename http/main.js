var server = require('./server.js');
var route = require('./router').route;
var reqhandler = require('./reqhandler');

var handle = {}
handle['/'] = reqhandler.start;
handle['/start'] = reqhandler.start;
handle['/upload'] = reqhandler.upload;

server.start(route, handle); 