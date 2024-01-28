const express = require('express');
const mongoose = require('mongoose');
const app = express(); 
//const config = require('./config/config.js');
const PORT = 3000;
mongoose.connect('mongodb://admin:password@localhost:27017')
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

app.get('/', (req,res) => {
    res.send('Hi, your request has been received');
});

app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
});