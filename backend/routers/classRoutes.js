// routers/classRoutes.js
const express = require('express');
const router = express.Router();
const { isAdmin } = require('../middleware/authenticate'); // Import isAdmin middleware
const { createClass, updateClass, getAllClasses, deleteClass } = require('../controllers/classController');
const { isStudent } = require('./middleware');

// Admin routes
router.post('/admin/classes', isAdmin, createClass);
router.put('/admin/classes/:date/:time', isAdmin, updateClass);
router.get('/admin/classes', isAdmin, getAllClasses); // Use isAdmin middleware here
router.delete('/admin/classes/:date/:time', isAdmin, deleteClass);

// Teacher routes
router.post('/teacher/classes', createClass);
router.put('/teacher/classes/:date/:time', updateClass);
router.get('/teacher/classes', getAllClasses); // Removed isTeacher middleware
router.delete('/teacher/classes/:date/:time', deleteClass);

// Student routes
router.get('/student/classes', isStudent, getAllClasses);


// Define your routes
router.get('/student/classes', isStudent, getAllClasses);

module.exports = router;
