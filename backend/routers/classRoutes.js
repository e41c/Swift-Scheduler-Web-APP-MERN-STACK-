// backend/routers/classRoutes.js

const express = require('express');
const router = express.Router();
const { isAdmin, isTeacher, isStudent } = require('../middleware/authMiddleware');
const { createClass, updateClass, getAllClasses, deleteClass, searchClasses } = require('../controllers/classController'); // Import searchClasses function

// Admin routes
router.post('/admin/classes', isAdmin, createClass);
router.put('/admin/classes/:date/:time', isAdmin, updateClass);
router.get('/admin/classes', isAdmin, getAllClasses);
router.delete('/admin/classes/:date/:time', isAdmin, deleteClass);

// Teacher routes
router.post('/teacher/classes', isTeacher, createClass);
router.put('/teacher/classes/:date/:time', isTeacher, updateClass);
router.get('/teacher/classes', isTeacher, getAllClasses);
router.delete('/teacher/classes/:date/:time', isTeacher, deleteClass);

// Student routes
router.get('/student/classes', isStudent, getAllClasses);

// New route for searching classes
router.get('/search', searchClasses);

module.exports = router;
