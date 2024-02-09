// models/Class.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema({
  teacher: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  classroom: { type: Schema.Types.ObjectId, ref: 'Classroom', required: true },
  rating: { type: Number, default: 0 }, 
  capacity: { type: Number, default: 30 },
  studentsEnrolled: [{ type: Schema.Types.ObjectId, ref: 'Student' }]
});

const Class = mongoose.model('Class', classSchema);

module.exports = Class;
