
const mongoose = require('mongoose')
const crpto = require('crypto')

const UserSchema = new mongoose.Schema({

    firstName:{
        type: String,
        required: true,
        validate(firstName){
            if(firstName.length < 2) throw Error("Must be at least 2 characters")
        }
    },
    lastName:{
        type:String,
        required :true,
        validate(lastName){
            if(lastName.length < 2) throw Error("Must be at least 2 characters")
        }
    },

    user_name: {
        type: String,
        required: true,
        unique: true,
        validate(unm){
            if(unm.length < 2) throw Error("Must be at least 2 characters")
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(email){
            if(email.length < 2) throw Error("Must be at least 2 characters")
        }
    },
    hashed_password: {
        type: String,
        required: true,
        validate(password) {
            if(password < 8) throw new Error("must be at least 8 characters")
        }
    },
    salt:{
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: "user",
        enum: ["student", "admin","instructor"]
    },
})

//hashing palin text password before saving
UserSchema.virtual("password")
    .set(function(password){
        this._password = password
        this.salt = this.makeSalt()
        this.hashed_password = this.encryptPassword(password)
    })
    .get(function(){
        return this._password
    })
UserSchema.methods = {
    authenticate: function(plainText){
        return this.encryptPassword(plainText) === this.hashed_password
    },
    encryptPassword: function(password){
        if(!password) return ""
        try{
            return crpto
                .createHmac("sha1", this.salt)
                .update(password)
                .digest("hex")
        }catch(err){
            return ""
        }
    },
    makeSalt: function(){
        return Math.round(new Date().valueOf() * Math.random()) + ""
    }
}

const User  = mongoose.model("user", UserSchema)
module.exports = User