// backend/controllers/classController.js
const Class = require('../models/Class');

exports.createClass = async (req, res) => {
  try {
    const newClass = await Class.create(req.body);
    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateClass = async (req, res) => {
  try {
    const { date, time } = req.params;
    const updatedClass = await Class.findOneAndUpdate(
      { date, time },
      req.body,
      { new: true }
    );
    if (!updatedClass) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.json(updatedClass);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllClasses = async (req, res) => {
  try {
    // Check if the user is a teacher or a student
    if (req.user.role === 'teacher') {
      // If user is a teacher, only return classes taught by them
      const classes = await Class.find({ teacher: req.user.userId });
      res.json(classes);
    } else if (req.user.role === 'student') {
      // If user is a student, return all available classes
      const classes = await Class.find();
      res.json(classes);
    } else {
      res.status(403).json({ message: 'Unauthorized' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteClass = async (req, res) => {
  try {
    const { date, time } = req.params;
    const deletedClass = await Class.findOneAndDelete({ date, time });
    if (!deletedClass) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.json(deletedClass);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
