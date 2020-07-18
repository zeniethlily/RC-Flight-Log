const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

});

userSchema.pre('save', function(next){
    var user = this;
    if(!user.isModified('password')){
        return next();
    }
    var hash = bcrypt.hashSync(user.password, 10);

    user.password = hash;
    next()
});

const User = mongoose.model("User", userSchema);
module.exports = User;