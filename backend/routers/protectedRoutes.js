// backend/routers/protectedRoutes.js

const express = require('express');
const router = express.Router();
const { isAdmin, isTeacher } = require('../middleware/authenticate'); // Update the path to the middleware module

// Protected route for admin
router.get('/admin', isAdmin, (req, res) => {
  res.json({ message: 'Admin protected route accessed successfully' });
});

// Protected route for teacher
router.get('/teacher', isTeacher, (req, res) => {
  res.json({ message: 'Teacher protected route accessed successfully' });
});

module.exports = router;
