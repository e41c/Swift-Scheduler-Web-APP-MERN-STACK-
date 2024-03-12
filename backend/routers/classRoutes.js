// backend/routers/classRoutes.js
const express = require('express');
const router = express.Router();
const Class = require('../models/Class'); // Make sure this path matches the location of your Class model
const { authenticate, isStudent } = require('../middleware/authMiddleware');
const mongoose = require('mongoose'); // Import mongoose for ObjectId validation

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
        const classes = await Class.find();
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

// Endpoint for a student to join a class with added validation and error handling
router.post('/join/:id', authenticate, isStudent, async (req, res) => {
    const classId = req.params.id.trim(); // Trim whitespace and newline characters
    const studentId = req.user.userId; // Extracted from the authenticated user

    if (!mongoose.Types.ObjectId.isValid(classId)) {
        return res.status(400).json({ message: 'Invalid class ID format' });
    }

    try {
        const classToUpdate = await Class.findById(classId);

        if (!classToUpdate) {
            return res.status(404).json({ message: 'Class not found' });
        }

        if (classToUpdate.studentsEnrolled.length >= classToUpdate.capacity) {
            return res.status(400).json({ message: 'Class is already full' });
        }

        if (classToUpdate.studentsEnrolled.includes(studentId)) {
            return res.status(400).json({ message: 'Student already enrolled in class' });
        }

        classToUpdate.studentsEnrolled.push(studentId);
        await classToUpdate.save();

        res.json({ message: 'Student successfully enrolled', class: classToUpdate });
    } catch (error) {
        res.status(500).json({ message: 'Error enrolling student', error: error.toString() });
    }
});

// Endpoint for a student to remove themselves from a class
router.post('/remove/:id', authenticate, isStudent, async (req, res) => {
    const classId = req.params.id.trim();
    const studentId = req.user.userId; // Extracted from the authenticated user

    try {
        const classToUpdate = await Class.findById(classId);

        // Check if the class exists
        if (!classToUpdate) {
            return res.status(404).json({ message: 'Class not found.' });
        }

        // Check if the student is currently enrolled in the class
        if (!classToUpdate.studentsEnrolled.map(id => id.toString()).includes(studentId)) {
            return res.status(403).json({ message: 'Student not enrolled in this class.' });
        }

        // Remove the student from the class
        classToUpdate.studentsEnrolled = classToUpdate.studentsEnrolled.filter(id => id.toString() !== studentId);
        await classToUpdate.save();

        res.json({ message: 'Successfully removed from class', class: classToUpdate });
    } catch (error) {
        res.status(500).json({ message: 'Error removing student from class', error: error.toString() });
    }
});


// Endpoint for a student to submit a rating for a class
router.post('/rate/:id', authenticate, isStudent, async (req, res) => {
    const classId = req.params.id.trim();
    const studentId = req.user.userId;
    const { rating } = req.body;

    if (!rating) {
        return res.status(400).json({ message: 'Rating is required.' });
    }

    try {
        const classToUpdate = await Class.findById(classId);

        if (!classToUpdate) {
            return res.status(404).json({ message: 'Class not found.' });
        }

        if (!classToUpdate.studentsEnrolled.map(id => id.toString()).includes(studentId)) {
            return res.status(403).json({ message: 'Student not enrolled in class.' });
        }

        const existingRatingIndex = classToUpdate.ratings.findIndex(r => r.student.toString() === studentId);

        if (existingRatingIndex !== -1) {
            classToUpdate.ratings[existingRatingIndex].rating = rating;
        } else {
            classToUpdate.ratings.push({ student: studentId, rating });
        }

        const totalRatings = classToUpdate.ratings.reduce((acc, curr) => acc + curr.rating, 0);
        classToUpdate.averageRating = totalRatings / classToUpdate.ratings.length;

        await classToUpdate.save();

        res.json({ message: 'Rating submitted successfully.', class: classToUpdate });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting rating', error: error.toString() });
    }
});

// Export the router
module.exports = router;
