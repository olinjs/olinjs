function route(handle, pathname, res, post_data) {
	if( typeof handle[pathname] === 'function') {
		handle[pathname](res, post_data);
	} else {
		console.log('Request not found');
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end('404 NOT FOUND')
	}
}

exports.route = route;