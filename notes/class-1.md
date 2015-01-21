## Class Notes - Day 1
**Subject: Infrastructure**


#### The Stack

IP: Low level, forms connection
TCP: Transport layer, lossless transmission. Allows data transmission.
HTTP: Request/response protocol on TCP/IP


#### HTTP Requests and Responses

Requests (header, body)
	- Header:
		- Get / HTTP/1.1				// Server knows its own IP (eg facebook.com), / is the root
		- Application-Type: text/HTML
		- Accept-Encoding:				// Allows large websites to be compressed
		- User-Agent: ...				// Important for responding with mobile vs web
		- ... et alius
	- Body (optional):				// Data
		- Search = ...

Responses (header, body):
	- Header :
		- HTTP 1.1 200 Ok
		- Application: 
		- Content-Type: 
		- Content-Length:
		- ... et alius
	- Body:
		- html body

**Fun Fact:  ** Cookies are sent in header if the browser has a cookie previously stored by the website

**RESTful Request Types:**
	- GET:  get webpage or resource
	- POST: used for changing state with regards to the server (AJAX, form submission)
	- PUT: put a resource onto the server (update data)
	- DELETE: it's a delete request.


#### The Web-App Stack

LAMP: Linux, Apache, MySQL, PHP
MEAN: Mongo (database), Express (back-end framework), Angular (front-end), Node (I/O)

Node: Non-blocking/Async (yay!), runs on V8 javascript interpreter (Chrome's) to capitalize on their speed optimizations

**Ports:**
	- 80: HTTP
	- 443: HTTPS
	- Browsers default to 80/443, but you can access a custom server port with url:port in url bar

Notes: 
	- Client identified by IP, Port, Client ID
	- Domain name resolves to a server, load balancer, or regional server depending on size of web-app
	- DNS lookup occurs before get request is sent. Occurs over UDP
