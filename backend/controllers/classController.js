// controllers/classController.js

const Class = require('../models/Class');

// Create a new class
exports.createClass = async (req, res) => {
  try {
    const newClass = await Class.create(req.body);
    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a class by date and time
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

// Read all classes
exports.getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find();
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a class by date and time
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
