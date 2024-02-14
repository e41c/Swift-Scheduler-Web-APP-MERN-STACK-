// models/Student.js

const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String },
  bio: { type: String },
  // Add more fields as needed
});

const studentModel = mongoose.model("students", studentSchema)
module.exports = studentModel