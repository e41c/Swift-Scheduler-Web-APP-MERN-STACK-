// backend controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');

exports.teacherLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the teacher by email
    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Validate password
    const validPassword = await bcrypt.compare(password, teacher.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: teacher._id, role: 'teacher' }, process.env.JWT_SECRET);

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.studentLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the student by email
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Validate password
    const validPassword = await bcrypt.compare(password, student.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: student._id, role: 'student' }, process.env.JWT_SECRET);

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.studentRegister = async (req, res) => {
  try {
    const { email, password, firstName, lastName, bio } = req.body;

    // Check if the student already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student already exists' });
    }

    // Create a new student object
    const newStudentData = {
      email,
      password: await bcrypt.hash(password, 10), // Hash the password
      firstName,
      lastName,
    };

    // Add bio if provided
    if (bio) {
      newStudentData.bio = bio;
    }

    // Create a new student instance
    const newStudent = new Student(newStudentData);

    // Save the student to the database
    await newStudent.save();

    // Generate JWT token
    const token = jwt.sign({ userId: newStudent._id, role: 'student' }, process.env.JWT_SECRET);

    res.status(201).json({ token }); // Respond with token
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};