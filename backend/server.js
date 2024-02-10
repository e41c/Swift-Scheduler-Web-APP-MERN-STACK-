const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRouter = require('./routers/auth.routes');
const classRouter = require('./routers/classRoutes');
const protectedRouter = require('./routes/protectedRoute'); // Assuming the correct path to the protectedRoute.js file
const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/auth', authRouter); // Authentication routes
app.use('/classes', classRouter); // Class routes
app.use('/protected', protectedRouter); // Protected route

// MongoDB connection
const PORT = 3000;
mongoose.connect('mongodb://admin:password@localhost:27017')
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Start server
app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
});
