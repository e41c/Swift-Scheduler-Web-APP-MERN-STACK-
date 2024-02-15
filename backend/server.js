// backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const adminRouter = require('./routers/adminRoutes');
const authRouter = require('./routers/authRoutes');
const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/auth', authRouter); // Authentication routes should come before other routes
app.use('/api', adminRouter);

// MongoDB connection
const PORT = process.env.PORT || 3000; // Use environment variable for port, if available
mongoose.connect('mongodb://admin:password@localhost:27017')
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
