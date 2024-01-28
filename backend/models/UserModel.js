
let mongoose = require('mongoose')

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
    password: {
        type: String,
        required: true,
        validate(password) {
            if(password < 8) throw new Error("must be at least 8 characters")
        }
    },
    role: {
        type: String,
        required: true,
        default: "user",
        enum: ["student", "admin","instructor"]
    },
})

const User  = mongoose.model("user", UserSchema)
module.exports = User