const mongoose = require('mongoose'),
    bcrypt = require("bcryptjs"),
    Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: password,
        required: true
    },
    createdAt: { 
        type: Date 
    },
    updatedAt: { 
        type: Date 
    }
});

userSchema.pre("save", function(next) {
    // SET createdAt AND updatedAt
    var now = new Date();
    this.updatedAt = now;
    if (!this.createdAt) {
        this.createdAt = now;
    }

    //ENCRYPT PASSWORD
    var user = this;
    if (!user.isModified("password")) {
        return next()
    }
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(password, done) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        done(err, isMatch);
    });
};

module.exports = mongoose.model('User', userSchema);
