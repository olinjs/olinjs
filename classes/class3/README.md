#Class 3

##Express
Now that we've explored Node.js a little, we will abstract the details away with the [Express](http://expressjs.com/) development framework. Before, in the Node Beginner's Book, our code looked a lot like this:
```javascript
var http = require("http");

http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}).listen(8888);
```