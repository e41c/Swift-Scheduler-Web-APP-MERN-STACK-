// backend/routers/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate, isTeacher, isStudent } = require('../middleware/authMiddleware');

// Login routes
router.post('/login/teacher', authController.teacherLogin);
router.post('/login/student', authController.studentLogin);

// Registration routes
router.post('/register/student', authController.studentRegister);
router.post('/register/teacher', authController.teacherRegister);

// Search all teachers
router.get('/teachers', authController.searchTeachers);
// New route to find a Teacher by ID - considering any necessary authentication and authorization
router.get('/teacher/:id', authenticate, authController.findTeacherById);

// Search all students
router.get('/students', authController.searchStudents);
// New route to find a Student by ID - considering any necessary authentication and authorization
router.get('/student/:id', authenticate, authController.findStudentById);

router.delete('/teachers/students/:id',authenticate, authController.deleteStudentById)
router.delete('/teachers/:id',authenticate, authController.deleteTeacherById)




module.exports = router;

