const mongoose = require('mongoose');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        validate: {
            validator: (firstName) => firstName.length >= 2,
            message: "Must be at least 2 characters"
        }
    },
    lastName: {
        type: String,
        required: true,
        validate: {
            validator: (lastName) => lastName.length >= 2,
            message: "Must be at least 2 characters"
        }
    },
    user_name: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (user_name) => user_name.length >= 2,
            message: "Must be at least 2 characters"
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (email) => email.length >= 8,
            message: "Must be at least 8 characters"
        }
    },
    hashed_password: {
        type: String,
        required: false,
        validate: {
            validator: (password) => password.length >= 8,
            message: "Must be at least 8 characters"
        }
    },
    salt: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: true,
        default: "student",
        enum: ["student", "admin", "instructor", "superadmin"],
        lowercase: true
    }
});
UserSchema.virtual('password')
    .set(function (password) {
        this._password = password;
    })
    .get(function () {
        return this._password;
    });
// Pre-save middleware to generate the salt and hash the password
UserSchema.pre("save", function (next) {
    if (this.isNew) {
        this.salt = this.makeSalt();
    }
    this.hashed_password = this.encryptPassword(this._password);
    next();
});


// User methods for authentication, password encryption, and salt generation
UserSchema.methods = {
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },
    encryptPassword: function (password) {
        if (!password) return "";
        try {
            return crypto
                .createHmac("sha1", this.salt)
                .update(password)
                .digest("hex");
        } catch (err) {
            return "";
        }
    },
    makeSalt: function () {
        return Math.round(new Date().valueOf() * Math.random()) + "";
    }
};

const User = mongoose.model("user", UserSchema);
module.exports = User;
