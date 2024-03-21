// backend/models/Classroom.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classroomSchema = new Schema({
  classroomNumber: { type: String, required: true },
  capacity: { type: Number, default: 30 },
  currentClasses: [{ type: Schema.Types.ObjectId, ref: 'Class' }],
  teacher: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
  students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
  availability: { type: Boolean, default: true }, // Add availability field
  // Add schedule field to store classroom schedule
  schedule: {
    date: {type: Date, required: true, min: '2024-01-01', max: '9999-12-12'},
    time: {type: Number, required: true, min: 0, max:23}
  }
});

const Classroom = mongoose.model('Classroom', classroomSchema);

module.exports = Classroom;
