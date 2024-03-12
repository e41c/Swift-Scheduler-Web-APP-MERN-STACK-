// models/Class.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema({
  teacher: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  classroom: { type: Schema.Types.ObjectId, ref: 'Classroom', required: true },
  capacity: { type: Number, default: 30 },
  studentsEnrolled: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
  studentLevel: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
  danceCategory: { type: String, enum: ['Ballet', 'Ballroom', 'Contemporary', 'Hip Hop', 'Jazz'], required: true },
  ratings: [{
    student: { type: Schema.Types.ObjectId, ref: 'Student' },
    rating: { type: Number, min: 1, max: 5 } // Assuming ratings are between 1 and 5
  }],
  averageRating: { type: Number, default: 0 } // Store the calculated average rating
});

const Class = mongoose.model('Class', classSchema);

module.exports = Class;

