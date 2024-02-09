
// PREVIOUS CODE from main branch -
// const express = require('express');
// const router = express.Router();
// const authController = require('../controllers/auth.controller');

// //signin endpoint
// router.post('/signin', authController.signIn);

// //signout endpoint
// router.get('/signout',authController.signOut);
// module.exports = router;



// CODE ADDED BY e41c
// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Login routes
router.post('/login/teacher', authController.teacherLogin);
router.post('/login/student', authController.studentLogin);

// Registration routes
router.post('/register/student', authController.studentRegister);

module.exports = router;
