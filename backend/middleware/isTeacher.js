// backend/middleware/isTeacher.js
const isTeacher = (req, res, next) => {
    if (req.user && req.user.role === 'teacher') {
        next();
    } else {
        res.status(403).json({ message: 'Unauthorized: Only teachers can access this resource.' });
    }
};

module.exports = isTeacher;
