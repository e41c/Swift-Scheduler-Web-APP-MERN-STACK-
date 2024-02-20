const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const studentModel = require('./models/Student')

const app = express()
app.use(express.json())
app.use(cors())

//Database connection I used a mongodb Cluster
mongoose.connect("mongodb+srv://rootadmin:m5NvavxMIOPodOKz@clusterrl.wd5fhyo.mongodb.net/Capstone-ii");

app.post('/register', (req, res) => {
    studentModel.create(req.body)
    .then(students => res.json(students))
    .catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log("Server is running")
})
