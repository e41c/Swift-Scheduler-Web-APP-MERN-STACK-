// backend/controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');

exports.teacherLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Received email:', email); // Add this line for debugging

    const teacher = await Teacher.findOne({ email });
    console.log('Retrieved teacher:', teacher); // Add this line for debugging

    if (!teacher) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    console.log('Stored hashed password:', teacher.password); // Add this line for debugging

    // Validate password
    const validPassword = await bcrypt.compare(password, teacher.password);
    console.log('Password validation result:', validPassword); // Add this line for debugging

    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    // had to add email to token needed for frontend -Ven
    
    const token = jwt.sign({ userId: teacher._id, role: 'teacher', email: teacher.email, isAdmin: teacher.isAdmin}, process.env.JWT_SECRET);

    res.json({ token });
    console.log("token "+token)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.studentLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const validPassword = await bcrypt.compare(password, student.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    // had to add email to token needed for frontend -Ven
    
    const token = jwt.sign({ userId: student._id, role: 'student', email: student.email }, process.env.JWT_SECRET);

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.searchTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.searchStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.studentRegister = async (req, res) => {
  try {
    const { email, password, firstName, lastName, bio } = req.body;

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudentData = {
      email,
      password: hashedPassword,
      firstName,
      lastName,
    };

    if (bio) {
      newStudentData.bio = bio;
    }

    const newStudent = new Student(newStudentData);
    await newStudent.save();

    // Generate JWT token
    // had to add email to token needed for frontend -Ven
    
    const token = jwt.sign({ userId: newStudent._id, role: 'student', email: newStudent.email }, process.env.JWT_SECRET);

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.teacherRegister = async (req, res) => {
  try {
    const { email, password, firstName, lastName, isAdmin } = req.body;

    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return res.status(400).json({ message: 'Teacher already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newTeacherData = {
      email,
      password: hashedPassword,
      firstName,
      lastName,
      isAdmin
    };

    const newTeacher = new Teacher(newTeacherData);
    await newTeacher.save();

    // Generate JWT token
    // had to add email to token needed for frontend -Ven
    
    const token = jwt.sign({ userId: newTeacher._id, role: 'teacher', email: newTeacher.email, isAdmin: newTeacher.isAdmin }, process.env.JWT_SECRET);

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Find a Teacher by ID - with enhanced logging
exports.findTeacherById = async (req, res) => {
  console.log("Attempting to find teacher with ID:", req.params.id); // Added log
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      console.log("No teacher found for ID:", req.params.id); // Added log
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.json(teacher);
  } catch (error) {
    console.error("Error finding teacher:", error); // Added log
    res.status(500).json({ message: error.message });
  }
};

// Find a Student by ID
exports.findStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

