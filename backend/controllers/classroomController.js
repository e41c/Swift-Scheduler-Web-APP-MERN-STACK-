// backend/controllers/classroomController.js
const Classroom = require('../models/Classroom');
const Class = require('../models/Class');


exports.getAvailableClassroomsByDay = async (req, res) => {
  const { date } = req.query; // Expecting date in 'YYYY-MM-DD' format

  if (!date) {
      return res.status(400).json({ message: "Date is required" });
  }

  try {
      // Parsing the date string to set at the beginning and end of the selected day
      const startDate = new Date(date);
      startDate.setUTCHours(0, 0, 0, 0);
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 1);

      // Finding all classes that are NOT within the selected day
      const classesOnDay = await Class.find({
          startDate: {
              $gte: startDate,
              $lt: endDate
          }
      }, 'classroom').exec();

      const classroomIds = classesOnDay.map(classObj => classObj.classroom);

      // Finding classrooms that are not booked on the selected day
      const availableClassrooms = await Classroom.find({
          _id: { $nin: classroomIds }
      });

      res.json(availableClassrooms);
  } catch (error) {
      console.error('Failed to fetch available classrooms:', error);
      res.status(500).json({ message: 'Failed to fetch available classrooms', error: error.message });
  }
};

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

  exports.getClassById = async (req, res) => {
    try {
      const classItem = await Class.findById(req.params.id);
      if (!classItem) {
        return res.status(404).json({ message: 'Class not found' });
      }
      res.json(classItem);
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
  
};
