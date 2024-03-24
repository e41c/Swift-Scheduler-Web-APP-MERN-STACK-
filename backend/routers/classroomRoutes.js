// backend/routers/classroomRoutes.js

const express = require('express');
const router = express.Router();
const Classroom = require('../models/Classroom');
const { authenticate } = require('../middleware/authMiddleware'); // Updated import statement
const classroomController = require('../controllers/classroomController');

// Create a new classroom
router.post('/', authenticate, async (req, res) => {
  try {
    const newClassroom = await Classroom.create({
      ...req.body,
      teacher: req.user.userId // Associate the classroom with the authenticated teacher
    });
    res.status(201).json(newClassroom);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all classrooms
router.get('/', async (req, res) => {
  try {
    const classrooms = await Classroom.find();
    res.json(classrooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Get all availible classrooms
router.get('/available/', async (req,res) => {
  try{
    const availableClassrooms = await Classroom.find({availability: 1});
    res.json(availableClassrooms)
  }catch(error){
    res.status(500).json({message: error.message})
    console.log(error)
  }
});

//endponint for getting available classes
router.get('/available-classes', authenticate, classroomController.getAvailableClassroomsByDay);

//available classrooms by month
// router.get('/available/:month', async(req, res) => {
//   const year = new Date().getFullYear()
//   const startDate = new Date(`${req.params.month} 1, ${year}`)
//   const endDate = new Date(startDate.getFullYear(),startDate.getMonth()+1,1);
//   try{
//     const monthlyClassrooms = await Classroom.find({availability:1, "schedule.date":{$gte: startDate, $lte: endDate}})
//     console.log("size of monthlyClassrooms", monthlyClassrooms.length)
//     res.json(monthlyClassrooms)
//   }
//   catch(error){
//     res.status(500).json({message: error.message})
//     console.log(error)
//   }
// });

// // available classrooms by date
// router.get('/available/:month/:date', async(req, res) => {
//   const year =new Date().getFullYear()
//   const startDate = new Date(`${req.params.month} ${req.params.date}, ${year}`)
//   const dateString = `${startDate.getFullYear()}-${startDate.getMonth() <= 8 ? "0": ""}${startDate.getMonth()+1}-${startDate.getDate()}`
//   try{
//     const monthlyClassrooms = await Classroom.find({availability:1, "schedule.date": new Date(dateString)})
//     console.log("size of monthlyClassrooms", monthlyClassrooms.length)
//     res.json(monthlyClassrooms)
//   }
//   catch(error){
//     res.status(500).json({message: error.message})
//     console.log(error)
//   }
// });



// Get a specific classroom by ID
router.get('/:id', async (req, res) => {
  try {
    const classroom = await Classroom.findById(req.params.id);
    if (!classroom) {
      return res.status(404).json({ message: 'Classroom not found' });
    }
    res.json(classroom);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a classroom
router.put('/:id', authenticate, async (req, res) => {
  try {
    const updatedClassroom = await Classroom.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedClassroom) {
      return res.status(404).json({ message: 'Classroom not found' });
    }
    res.json(updatedClassroom);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a classroom
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const deletedClassroom = await Classroom.findByIdAndDelete(req.params.id);
    if (!deletedClassroom) {
      return res.status(404).json({ message: 'Classroom not found' });
    }
    res.json(deletedClassroom);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
