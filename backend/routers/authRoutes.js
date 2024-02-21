// backend/routers/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { searchTeachers, searchStudents } = require('../controllers/authController');
const { isTeacher, isStudent } = require('../middleware/authMiddleware');

// Login routes
router.post('/login/teacher', authController.teacherLogin);
router.post('/login/student', authController.studentLogin);

// Registration routes
router.post('/register/student', authController.studentRegister);
router.post('/register/teacher', authController.teacherRegister);

// Search all teachers
router.get('/teachers', searchTeachers);

// Search all students
router.get('/students', searchStudents);



module.exports = router;
