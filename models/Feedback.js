const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  studentName: {
    type: String,
    required: true
  },
  courseName: {
    type: String,
    required: [true, 'Course name is required'],
    trim: true
  },
  facultyName: {
    type: String,
    required: [true, 'Faculty name is required'],
    trim: true
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot be more than 5']
  },
  comments: {
    type: String,
    required: [true, 'Comments are required'],
    trim: true,
    minlength: [10, 'Comments must be at least 10 characters']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Feedback', feedbackSchema);
