// routes/protectedRoute.js

const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

// Protected route
router.get('/', authenticate, (req, res) => {
  res.json({ message: 'Protected route accessed successfully' });
});

module.exports = router;
