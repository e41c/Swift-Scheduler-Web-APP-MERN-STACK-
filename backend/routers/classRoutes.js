// routes/classRoutes.js

const express = require('express');
const router = express.Router();
const { isAdmin, isTeacher } = require('../middleware/authenticate');
const { createClass, updateClass, getAllClasses, deleteClass } = require('../controllers/classController');

// Admin routes
router.post('/classes', isAdmin, createClass);
router.put('/classes/:date/:time', isAdmin, updateClass);
router.get('/classes', isAdmin, getAllClasses);
router.delete('/classes/:date/:time', isAdmin, deleteClass);

// Teacher routes
router.post('/classes', isTeacher, createClass);
router.put('/classes/:date/:time', isTeacher, updateClass);
router.get('/classes', isTeacher, getAllClasses);
router.delete('/classes/:date/:time', isTeacher, deleteClass);

module.exports = router;
