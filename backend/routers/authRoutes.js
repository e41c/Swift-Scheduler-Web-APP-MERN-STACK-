// backend/routers/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Login routes
router.post('/login/teacher', authController.teacherLogin);
router.post('/login/student', authController.studentLogin);

// Registration routes
router.post('/register/student', authController.studentRegister);

module.exports = router;
