var ls = require("./make_it_module.js");


ls(process.argv[2], process.argv[3], function callback(err, array) {
    if (err) {
        console.log(err);
        return err;
    }

    console.log(array.join("\n"));
});