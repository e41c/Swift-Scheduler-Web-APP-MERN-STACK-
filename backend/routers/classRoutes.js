// routes/classRoutes.js

const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const { createClass, updateClass, getAllClasses, deleteClass } = require('../controllers/classController');

// Admin routes
router.post('/classes', authenticate, createClass);
router.put('/classes/:date/:time', authenticate, updateClass);
router.get('/classes', authenticate, getAllClasses);
router.delete('/classes/:date/:time', authenticate, deleteClass);

module.exports = router;
