var http = require('http')

var urls = process.argv.slice(2)
var content = {}
var complete = 0

// construct dictionary of url-content pairs
urls.forEach(function(url) {
	content[url] = ''
	get_request(url)
})

function get_request(url) {
	
	http.get(url, function(response) {
		
		response.setEncoding('utf8')
	
		response.on('data', function (data) {
			content[url] += data
		})

		response.on('error', function(err) {
			console.error('Response Error:', err)
		})
	
		response.on('end', function () {
			complete++			
			
			// if all GET requests are complete, print all content
			if (complete >= urls.length) {
				for (var url in content) {
					console.log(content[url])
				}
			}
		})
	
	}).on('error', function(err) {
		console.error('GET Error:', err)
	})
}