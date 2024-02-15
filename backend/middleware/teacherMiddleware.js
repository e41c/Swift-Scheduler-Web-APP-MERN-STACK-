// middleware/teacherMiddleware.js
const isTeacher = (req, res, next) => {
    // Check if user is authenticated and has teacher role
    if (req.user && req.user.role === 'teacher') {
        next(); // Allow access to the next middleware
    } else {
        res.status(403).json({ message: 'Teacher access required' });
    }
};

module.exports = isTeacher;
