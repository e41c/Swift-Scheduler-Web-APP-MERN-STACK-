// backend/routers/classRoutes.js
const express = require('express');
const router = express.Router();
const Class = require('../models/Class'); // Ensure this model path is correct
const { authenticate } = require('../middleware/authMiddleware');

// Create a new class
router.post('/', authenticate, async (req, res) => {
    try {
        const newClass = await Class.create({
            ...req.body,
            teacher: req.user.userId // Assuming req.user is set by 'authenticate' middleware and contains 'userId'
        });
        res.status(201).json(newClass);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all classes
router.get('/', authenticate, async (req, res) => {
    try {
        // Optionally, filter classes based on the role (teacher/student) if needed
        const classes = await Class.find(); // Add any specific filters if required
        res.json(classes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a specific class by ID
router.get('/:id', authenticate, async (req, res) => {
    try {
        const classItem = await Class.findById(req.params.id);
        if (!classItem) {
            return res.status(404).json({ message: 'Class not found' });
        }
        res.json(classItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a class
router.put('/:id', authenticate, async (req, res) => {
    try {
        const updatedClass = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedClass) {
            return res.status(404).json({ message: 'Class not found' });
        }
        res.json(updatedClass);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a class
router.delete('/:id', authenticate, async (req, res) => {
    try {
        const deletedClass = await Class.findByIdAndDelete(req.params.id);
        if (!deletedClass) {
            return res.status(404).json({ message: 'Class not found' });
        }
        res.json({ message: 'Class successfully deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
