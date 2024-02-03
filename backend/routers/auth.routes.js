const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

//signin endpoint
router.post('/signin', authController.signIn);

//signout endpoint
router.get('/signout',authController.signOut);
module.exports = router;