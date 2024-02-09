// previous code from main brain
// const User = require('../models/UserModel.js');
// const jwt = require('jsonwebtoken');
// // const expressJwt = require('express-jwt');

// // signin endpoint
// exports.signIn = async (req, res) => {
//     try{
//         let user = await User.findOne({user_name: req.body.user_name});
//         if(!user) {
//             return res.status(401).send({error: "User not found"});
//         }
//         if(!user.authenticate(req.body.password)){
//             return res.status(401).send({error: "Username and password don't match"});
//         }
    
//     const token = jwt.sign({user_name: user.user_name}, "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcwNjcyNzU1NCwiaWF0IjoxNzA2NzI3NTU0fQ.vNymv_ch6QX7CKgLLRsd1mluQmyPD88ThwlYY-imcn0");
//     res.cookie("t", token, {expire: new Date() + 9999});
//     return res.json({
//         token,
//         user: {
//             _id: user._id,
//             user_name: user.user_name,
//             email: user.email,
//             role: user.role
//         }
//     })

//     }catch(error){
//         res.status(401).json({error: "Could not sign in"});
//     }
// }

// //signout endpoint

// exports.signOut = (req, res) => {
//     res.clearCookie("t");
//     return res.status(200).json({message: "Signed out"});
// }



// // CODE ADDED BY e41c
// controllers/authController.js

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
  // Student registration logic
};
