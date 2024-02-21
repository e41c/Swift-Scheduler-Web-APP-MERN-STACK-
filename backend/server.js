// backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRouter = require('./routers/authRoutes');
const classroomRouter = require('./routers/classroomRoutes');
const { authenticate } = require('./middleware/authMiddleware'); // Import auth middleware
const app = express();
require('dotenv').config();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/auth', authRouter);
app.use('/classrooms', authenticate, classroomRouter); // Apply auth middleware to classroom routes

// MongoDB connection
const PORT = process.env.PORT || 3000;
mongoose.connect('mongodb://admin:password@localhost:27017')
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

console.log('JWT_SECRET:', process.env.JWT_SECRET);
