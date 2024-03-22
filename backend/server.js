// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRouter = require('./routers/authRoutes');
const classRouter = require('./routers/classRoutes'); // Ensure this path is correct
const classroomRouter = require('./routers/classroomRoutes');
//const adminRouter = require('./routers/adminRoute.js')
const app = express();
require('dotenv').config();

app.use(bodyParser.json());

// Update the route prefix for classRouter to '/classes' from '/teacher'
app.use('/auth', authRouter);
app.use('/classrooms', classroomRouter);
app.use('/classes', classRouter); // This line is updated
//app.use('/admin', adminRouter)

const PORT = process.env.PORT || 3000;
mongoose.connect('mongodb://admin:password@localhost:27017')
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
