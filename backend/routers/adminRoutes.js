// backend/routers/adminRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Add user
router.post('/admin', authController.teacherLogin); // Assuming teacherLogin is used for adding user
// List all users
router.get('/admin', authController.studentLogin); // Assuming studentLogin is used for listing all users
// Get user by username
router.get('/admin/:username', authController.studentRegister); // Assuming studentRegister is used for getting user by username
// Delete user by username
router.delete('/admin/:username', authController.studentRegister); // Assuming studentRegister is used for deleting user by username
// Update user by username
router.patch('/admin/:username', authController.studentRegister); // Assuming studentRegister is used for updating user by username

module.exports = router;
