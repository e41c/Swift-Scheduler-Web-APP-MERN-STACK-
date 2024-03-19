// backend/routers/classroomRoutes.js

const express = require('express');
const router = express.Router();
const Classroom = require('../models/Classroom');
const { authenticate } = require('../middleware/authMiddleware'); // Updated import statement


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

// Get all availible classrooms by date/time
router.get('/available/:date/:time', async (req,res) => {
  try{
    let date = Number(req.params.date)
    let time = Number(req.params.time)
    const dateFilter = new Date();
    dateFilter.setDate(date)


    const availableRooms = await Classroom.find({availability: 1 , "schedule.time": {$lte: time}});
    console.log("before ",availableRooms);
    availableRooms.forEach(room => {
      if((room.schedule.date < dateFilter)){
        availableRooms.pop()
      }
    
    });
    console.log("after ",availableRooms)
    res.json(availableRooms);
  }catch(error){
    console.log(error)
  }
});



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
