// Following this example to help me modularize my routes:
// http://dailyjs.com/2012/01/26/effective-node-modules/

require('./main');
require('./login');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});