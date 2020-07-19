const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
    airplanes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Airplane"
        }
    ],
});

userSchema.pre("save", function(next){
    var user = this;
    if(!user.isModified("password")){
        return next();
    }
    var hash = bcrypt.hashSync(user.password, 10);

    user.password = hash;
    next();
});

userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

const User = mongoose.model("User", userSchema);
module.exports = User;