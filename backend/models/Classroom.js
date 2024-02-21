// backend/models/Classroom.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classroomSchema = new Schema({
  classroomNumber: { type: String, required: true },
  capacity: { type: Number, default: 30 },
  currentClasses: [{ type: Schema.Types.ObjectId, ref: 'Class' }],
  teacher: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true }, // Modify this line to expect a single ObjectId
  students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
  // Add more fields as needed
});

// Custom validation to ensure a maximum of 10 classes at one time
classroomSchema.pre('save', async function (next) {
  const numberOfClasses = this.currentClasses.length;
  if (numberOfClasses >= 10) {
    return next(new Error('Maximum number of classes reached for this classroom'));
  }
  next();
});

// Custom validation to ensure a maximum of 30 students per classroom
classroomSchema.pre('save', async function (next) {
  const numberOfStudents = this.students.length;
  if (numberOfStudents >= 30) {
    return next(new Error('Maximum number of students reached for this classroom'));
  }
  next();
});

const Classroom = mongoose.model('Classroom', classroomSchema);

module.exports = Classroom;
