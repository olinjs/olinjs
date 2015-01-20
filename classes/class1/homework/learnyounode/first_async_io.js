var fs = require("fs");

function callback (err, data) {
    if (err != null) {
        console.log(err);
        return err;
    } 

    console.log(data.split("\n").length - 1);
}

fs.readFile(process.argv[2], "utf-8", callback);