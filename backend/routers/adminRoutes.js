// backend/routers/adminRoutes.js

const express = require('express');
const router = express.Router();
const utilityController = require('../controllers/utility.controller');

//add user
router.post('/admin', utilityController.createUser);
//list all users
router.get('/admin', utilityController.getUsers);
//get user by username
router.get('/admin/:username', utilityController.getUserByUsername);
//delete user by username
router.delete('/admin/:username', utilityController.deleteUserByUsername);
//update user by username
router.patch('/admin/:username', utilityController.updateUserByUsername);
module.exports = router;