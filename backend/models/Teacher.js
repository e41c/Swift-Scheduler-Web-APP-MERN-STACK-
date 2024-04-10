const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const teacherSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  bio: { type: String },
  rating: { type: Number, default: 0 },
  isAdmin: { type: Boolean, default: false },
  // Add more fields as needed
});


const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
