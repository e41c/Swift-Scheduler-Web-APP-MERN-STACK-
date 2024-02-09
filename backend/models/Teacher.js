// models/Teacher.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  // Add more fields as needed
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
