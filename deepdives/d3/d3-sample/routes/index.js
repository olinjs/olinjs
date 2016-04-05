var fs = require('fs');
var tsv = require('tsv');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET clock visualization page. */
router.get('/clock', function(req, res, next) {
  res.render('clock');
});

/* GET bar chart visualization page. */
router.get('/chart', function(req, res, next) {
  res.render('chart');
});

/* GET data for bar chart. */
router.get('/api/data', function(req, res, next) {
  // for the sake of example, read data from a tsv -- you might read data
  // out of a database instead
  fs.readFile("./sample_server_data.tsv", "utf8", function(err, data) {
    res.json({
      data: tsv.parse(data.trim())
    });
  });
});

module.exports = router;
