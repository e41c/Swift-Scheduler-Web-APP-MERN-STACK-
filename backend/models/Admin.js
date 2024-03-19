const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    
    firstName:{type: String, required: true, min:2},
    lastName:{type: String, required: true, min: 2},
    email:{type: String,
         required: true,
        validate: {
            validator: function(v){
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: 'invalid email address format'},
        unique: true,
    },
    password:{type: String, required: true, min:8},

});

const Admin = mongoose.model('AdminUser', AdminSchema)
module.exports = Admin;