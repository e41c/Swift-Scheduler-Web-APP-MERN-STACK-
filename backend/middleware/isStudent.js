// Define the isStudent middleware function
const isStudent = (req, res, next) => {
    // Check if the user is a student
    if (req.user && req.user.role === 'student') {
      // If the user is a student, continue to the next middleware
      next();
    } else {
      // If the user is not a student, return an error response
      res.status(403).json({ error: 'Unauthorized: Only students can access this resource.' });
    }
  };
  