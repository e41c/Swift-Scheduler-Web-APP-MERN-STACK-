const mongoose = require('mongoose')
const InstructorSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    bio:String,
    
})