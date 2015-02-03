var done = false;

exports.start_ = function (req, res) {
      res.sendfile("index.html");
}

exports.upload = function (req, res) {
    console.log(req.files);
    res.end("File uploaded.");
}