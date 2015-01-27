var server = require("./server");
var router = require("./router");
var requestHandlers = require ("./requestHandlers");

var handle = {}
handle ["/"] = requestHandlers.start;
handle ["/start"] = requestHandlers.start;
handle ["/upload"] = requestHandlers.upload;

// TODO- why require router in index instead of in server where it's used?
server.start(router.route, handle);