//The basis of all routing is the URL. Fortunately, Node has some
// basic functions which handle reading the URL so we can then
// decide what the user is actually trying to do.

function route(pathname) {
console.log("About to route a request for " + pathname);
}
exports.route = route;