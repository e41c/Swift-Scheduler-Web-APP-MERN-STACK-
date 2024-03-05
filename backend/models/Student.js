// models/Student.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String },
  bio: { type: String },
  // Add more fields as needed
});


const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
