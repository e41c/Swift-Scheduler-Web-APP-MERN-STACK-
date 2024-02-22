// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  // Get token from request headers
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

function isTeacher(req, res, next) {
  if (req.user.role === 'teacher') {
    next();
  } else {
    res.status(403).json({ message: 'Unauthorized' });
  }
}

function isStudent(req, res, next) {
  if (req.user.role === 'student') {
    next();
  } else {
    res.status(403).json({ message: 'Unauthorized' });
  }
}

module.exports = { authenticate, isTeacher, isStudent };

