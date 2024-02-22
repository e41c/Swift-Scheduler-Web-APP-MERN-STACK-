// backend/controllers/classroomController.js
const Classroom = require('../models/Classroom');

exports.createClassroom = async (req, res) => {
  try {
    const newClassroom = await Classroom.create(req.body);
    res.status(201).json(newClassroom);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllClassrooms = async (req, res) => {
  try {
    const classrooms = await Classroom.find();
    res.json(classrooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getClassroomById = async (req, res) => {
  try {
    const classroom = await Classroom.findById(req.params.id);
    if (!classroom) {
      return res.status(404).json({ message: 'Classroom not found' });
    }
    res.json(classroom);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateClassroom = async (req, res) => {
  try {
    const updatedClassroom = await Classroom.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedClassroom) {
      return res.status(404).json({ message: 'Classroom not found' });
    }
    res.json(updatedClassroom);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteClassroom = async (req, res) => {
  try {
    const deletedClassroom = await Classroom.findByIdAndDelete(req.params.id);
    if (!deletedClassroom) {
      return res.status(404).json({ message: 'Classroom not found' });
    }
    res.json(deletedClassroom);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
