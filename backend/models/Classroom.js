// models/Classroom.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classroomSchema = new Schema({
  classroomNumber: { type: String, required: true },
  capacity: { type: Number, default: 30 },
  currentClasses: [{ type: Schema.Types.ObjectId, ref: 'Class' }]
});

const Classroom = mongoose.model('Classroom', classroomSchema);

module.exports = Classroom;
