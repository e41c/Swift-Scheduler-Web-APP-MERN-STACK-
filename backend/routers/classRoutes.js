// backend/routers/classRoutes.js
const express = require('express');
const router = express.Router();
const { isTeacher, isStudent } = require('../middleware/authMiddleware');
const { createClass, updateClass, getAllClasses, deleteClass } = require('../controllers/classController');

// Teacher routes
router.post('/teacher/classes', isTeacher, createClass);
router.put('/teacher/classes/:date/:time', isTeacher, updateClass);
router.get('/teacher/classes', isTeacher, getAllClasses);
router.delete('/teacher/classes/:date/:time', isTeacher, deleteClass);

// Student routes
router.get('/student/classes', isStudent, getAllClasses); // Make sure only students can access

module.exports = router;
