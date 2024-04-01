// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const cors = require('cors'); // Import the cors middleware

function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer Token
  if (!token) {
    return res.status(401).send({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send({ message: 'Invalid token.' });
  }
}

function isTeacher(req, res, next) {
  console.log(req.user); // Debug: Log user object to debug
  if (req.user && req.user.role === 'teacher') {
    next();
  } else {
    console.log('Failed role check:', req.user); // Additional logging
    return res.status(403).json({ message: 'Unauthorized access. User is not a teacher.' });
  }
}

function isStudent(req, res, next) {
  if (req.user && req.user.role === 'student') {
    next();
  } else {
    return res.status(403).json({ message: 'Unauthorized access. User is not a student.' });
  }
}

module.exports = { authenticate, isTeacher, isStudent };
