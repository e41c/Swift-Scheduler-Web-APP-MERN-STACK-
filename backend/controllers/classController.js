// controllers/classController.js

const Class = require('../models/Class');
const Teacher = require('../models/Teacher');

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
    const classes = await Class.find();
    res.json(classes);
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

exports.rateTeacher = async (req, res) => {
  try {
    const { classId } = req.params;
    const { rating } = req.body;

    const existingClass = await Class.findById(classId);
    if (!existingClass) {
      return res.status(404).json({ message: 'Class not found' });
    }

    // Ensure the student is enrolled in the class
    if (!existingClass.studentsEnrolled.includes(req.user._id)) {
      return res.status(403).json({ message: 'You are not enrolled in this class' });
    }

    // Ensure the student hasn't already rated the teacher for this class
    if (existingClass.ratings.some(r => r.student.equals(req.user._id))) {
      return res.status(400).json({ message: 'You have already rated this class' });
    }

    // Add the rating to the class
    existingClass.ratings.push({ student: req.user._id, rating });
    await existingClass.save();

    // Calculate average rating for the teacher and update the teacher's profile
    const teacherId = existingClass.teacher;
    const classesTaughtByTeacher = await Class.find({ teacher: teacherId });
    const teacherRatingSum = classesTaughtByTeacher.reduce((acc, c) => acc + c.rating, 0);
    const teacherAverageRating = teacherRatingSum / classesTaughtByTeacher.length;

    // Update the teacher's average rating
    await Teacher.findByIdAndUpdate(teacherId, { averageRating: teacherAverageRating });

    res.json({ message: 'Teacher rated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
