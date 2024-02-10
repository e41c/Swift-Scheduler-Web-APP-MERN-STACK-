const jwt = require('jsonwebtoken');

function isAdmin(req, res, next) {
    // Check if user is authenticated and has admin role
    if (req.user && req.user.role === 'admin') {
      next(); // Allow access to the next middleware
    } else {
      res.status(403).json({ message: 'Admin access required' });
    }
  }
  
function isTeacher(req, res, next) {
    // Check if user is authenticated and has teacher role
    if (req.user && req.user.role === 'teacher') {
      next(); // Allow access to the next middleware
    } else {
      res.status(403).json({ message: 'Teacher access required' });
    }
  }

function isStudent(req, res, next) {
  // Check if user is authenticated and has student role
  if (req.user && req.user.role === 'student') {
    next(); // Allow access to the next middleware
  } else {
    res.status(403).json({ message: 'Student access required' });
  }
}

function authenticate(req, res, next) {
  // Get token from request headers
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = { isAdmin, isTeacher, isStudent, authenticate };
