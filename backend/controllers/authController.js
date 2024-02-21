const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');

// Teacher login
exports.teacherLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Received email:', email); // Add this line for debugging

    // Find the teacher by email
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
    
    const token = jwt.sign({ userId: teacher._id, role: 'teacher', email: teacher.email}, process.env.JWT_SECRET);

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Student login
exports.studentLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Received email:', email); // Add this line for debugging

    // Find the student by email
    const student = await Student.findOne({ email });
    console.log('Retrieved student:', student); // Add this line for debugging

    if (!student) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    console.log('Stored hashed password:', student.password); // Add this line for debugging

    // Validate password
    const validPassword = await bcrypt.compare(password, student.password);
    console.log('Password validation result:', validPassword); // Add this line for debugging

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

// Student registration
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
    // had to add email to token needed for frontend -Ven
    
    const token = jwt.sign({ userId: newStudent._id, role: 'student', email: newStudent.email }, process.env.JWT_SECRET);

    res.status(201).json({ token }); // Respond with token
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Teacher registration
exports.teacherRegister = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // Check if the teacher already exists
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return res.status(400).json({ message: 'Teacher already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new teacher object
    const newTeacherData = {
      email,
      password: hashedPassword, // Use the hashed password
      firstName,
      lastName,
    };

    // Create a new teacher instance
    const newTeacher = new Teacher(newTeacherData);

    // Save the teacher to the database
    await newTeacher.save();

    // Generate JWT token
    // had to add email to token needed for frontend -Ven
    
    const token = jwt.sign({ userId: newTeacher._id, role: 'teacher', email: newTeacher.email }, process.env.JWT_SECRET);

    res.status(201).json({ token }); // Respond with token
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
