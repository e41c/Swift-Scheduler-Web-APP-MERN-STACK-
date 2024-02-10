const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const adminRouter = require('./routers/admin.routes');
const authRouter = require('./routers/auth.routes');
const app = express(); 

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/', authRouter); // Authentication routes should come before other routes
app.use('/api', adminRouter);

// MongoDB connection
const PORT = 3000;
mongoose.connect('mongodb://admin:password@localhost:27017')
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Start server
app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
});