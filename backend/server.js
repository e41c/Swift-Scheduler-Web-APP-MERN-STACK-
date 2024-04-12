// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRouter = require('./routers/authRoutes');
const classRouter = require('./routers/classRoutes'); // Ensure this path is correct
const classroomRouter = require('./routers/classroomRoutes');
const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(bodyParser.json());
app.use(cors({
    origin: [
        // 'https://swift-scheduler-frontend.vercel.app/',
        'https://capstone-ii-group26.vercel.app/'
    ],
    credentials: true
}));
// Update the route prefix for classRouter to '/classes' from '/teacher'
app.use('/auth', authRouter);
app.use('/classrooms', classroomRouter);
app.use('/classes', classRouter); // This line is updated


const PORT = process.env.PORT || 3000;
mongoose.connect('mongodb+srv://rootadmin:m5NvavxMIOPodOKz@clusterrl.wd5fhyo.mongodb.net/Swift-Scheduler')
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
