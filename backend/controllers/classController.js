// backend/controllers/classController.js
const Class = require('../models/Class');

exports.createClass = async (req, res) => {
  try {
    // Directly using req.user.userId to associate class with the teacher
    const newClass = await Class.create({
      ...req.body,
      teacher: req.user.userId
    });
    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ message: 'Error creating class', error: error.message });
  }
};

exports.getAllClasses = async (req, res) => {
  try {
    // No distinction based on user role; simplifies to direct fetch
    const classes = await Class.find().populate('teacher classroom studentsEnrolled');
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching classes', error: error.message });
  }
};

exports.getClassById = async (req, res) => {
  try {
    const classItem = await Class.findById(req.params.id).populate('teacher classroom studentsEnrolled');
    if (!classItem) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.json(classItem);
  } catch (error) {
    res.status(500).json({ message: 'Error finding class', error: error.message });
  }
};

exports.updateClass = async (req, res) => {
  try {
    const updatedClass = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('teacher classroom studentsEnrolled');
    if (!updatedClass) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.json(updatedClass);
  } catch (error) {
    res.status(500).json({ message: 'Error updating class', error: error.message });
  }
};

exports.deleteClass = async (req, res) => {
  try {
    const deletedClass = await Class.findByIdAndDelete(req.params.id);
    if (!deletedClass) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.json({ message: 'Class successfully deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting class', error: error.message });
  }
};

exports.getClassHistoryByUserId = async (req, res) => {
  try {
    const { userId } = req.params; // Get the user ID from the URL
    const authUserId = req.user.userId; // Authenticated user's ID from the token

    // Check if the authenticated user is trying to access someone else's data
    if (userId !== authUserId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    let classHistory = [];

    if (req.user.role === 'teacher') {
      classHistory = await Class.find({ teacher: userId })
        .populate('classroom studentsEnrolled');
    } else if (req.user.role === 'student') {
      classHistory = await Class.find({ studentsEnrolled: userId })
        .populate('teacher classroom studentsEnrolled');
    } else {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    classHistory.sort((a, b) => new Date(a.date) - new Date(b.date));

    res.json(classHistory);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching class history', error: error.message });
  }
};


