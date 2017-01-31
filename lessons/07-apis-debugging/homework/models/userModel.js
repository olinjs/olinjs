var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// Create a Schema
var userSchema = mongoose.Schema({
	local            : {
        username       : String,
        password     : String,
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
  displayName: String,
  twotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Twote' }]
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};



module.exports = mongoose.model("User", userSchema);