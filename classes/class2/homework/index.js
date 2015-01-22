/*Define dependencies.*/
var express = require('express');
var multer  = require('multer');
var router = require('./router.js');

var app = express();
var port = process.argv[2];

/*Handling Image Upload*/
app.use(multer({ dest: './uploads/',
     rename: function (fieldname, filename) {
        return filename + Date.now();
      },
    onFileUploadStart: function (file) {
      console.log(file.originalname + ' is starting ...')
    },
    onFileUploadComplete: function (file) {
      console.log(file.fieldname + ' uploaded to  ' + file.path)
    }
}));

/*Handling routes.*/
app.get('/start', router.start_); 
app.post('/upload', router.upload);

/*Run the server.*/
app.listen(port, function () {
    console.log("Listening to " + port);
});


