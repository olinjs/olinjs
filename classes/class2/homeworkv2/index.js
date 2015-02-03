var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}

handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start; 
handle["/upload"] = requestHandlers.upload;

server.start(process.argv[2], router.route, handle);
