// backend/controllers/classroomController.js
const Classroom = require('../models/Classroom');
const Class = require('../models/Class');

exports.getAvailableClassroomsWithSlotsByDay = async (req, res) => {
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ message: "Date is required" });
  }

  try {
    const operatingHoursStart = 9; // Academy opens at 9 AM
    const operatingHoursEnd = 21; // Academy closes at 9 PM
    const allSlots = [];
    for (let hour = operatingHoursStart; hour < operatingHoursEnd; hour++) {
      allSlots.push(`${hour}:00`);
    }

    // Fetch all classrooms
    const classrooms = await Classroom.find({});

    const startDate = new Date(date);
    startDate.setUTCHours(0, 0, 0, 0); // Set to start of day
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 1); // Set to end of day

    // Initialize a map to hold available slots for each classroom
    const availableSlotsByClassroom = {};

    for (const classroom of classrooms) {
      let classroomSlots = [...allSlots]; // Copy of all possible slots

      // Fetch classes scheduled in this classroom for the day
      const scheduledClasses = await Class.find({
        classroom: classroom._id,
        startDate: { $gte: startDate, $lt: endDate }
      }).exec();

      // Remove slots occupied by scheduled classes
      scheduledClasses.forEach(cls => {
        const classStartHour = cls.startDate.getUTCHours().toString();
        const index = classroomSlots.indexOf(`${classStartHour}:00`);
        if (index > -1) {
          classroomSlots.splice(index, 1); // Remove the slot occupied by this class
        }
      });

      // Add the classroom and its available slots to the map
      availableSlotsByClassroom[classroom._id] = {
        _id: classroom._id,
        classroomNumber: classroom.classroomNumber,
        capacity: classroom.capacity,
        availableSlots: classroomSlots
      };
    }

    // Convert the map to an array of objects for the response
    const response = Object.keys(availableSlotsByClassroom).map(key => availableSlotsByClassroom[key]);

    res.json(response);
  } catch (error) {
    console.error('Error fetching available classrooms and slots:', error);
    res.status(500).json({ message: 'Failed to fetch available classrooms and slots', error: error.message });
  }
};

// exports.getAvailableClassroomsByDay = async (req, res) => {
//   const { date } = req.query; // Expecting date in 'YYYY-MM-DD' format

//   if (!date) {
//       return res.status(400).json({ message: "Date is required" });
//   }

//   try {
//       // Parsing the date string to set at the beginning and end of the selected day
//       const startDate = new Date(date);
//       startDate.setUTCHours(0, 0, 0, 0);
//       const endDate = new Date(startDate);
//       endDate.setDate(startDate.getDate() + 1);

//       // Finding all classes that are NOT within the selected day
//       const classesOnDay = await Class.find({
//           startDate: {
//               $gte: startDate,
//               $lt: endDate
//           }
//       }, 'classroom').exec();

//       const classroomIds = classesOnDay.map(classObj => classObj.classroom);

//       // Finding classrooms that are not booked on the selected day
//       const availableClassrooms = await Classroom.find({
//           _id: { $nin: classroomIds }
//       });

//       res.json(availableClassrooms);
//   } catch (error) {
//       console.error('Failed to fetch available classrooms:', error);
//       res.status(500).json({ message: 'Failed to fetch available classrooms', error: error.message });
//   }
// };

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
