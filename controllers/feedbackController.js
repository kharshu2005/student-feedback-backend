const Feedback = require('../models/Feedback');
const Student = require('../models/Student');
const { validationResult } = require('express-validator');

// Submit Feedback
exports.submitFeedback = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { courseName, facultyName, rating, comments } = req.body;

    // Get student details
    const student = await Student.findById(req.user.id);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    // Create feedback
    const feedback = new Feedback({
      studentId: student._id,
      studentName: student.name,
      courseName,
      facultyName,
      rating,
      comments
    });

    await feedback.save();

    res.status(201).json({
      success: true,
      message: 'Feedback submitted successfully',
      data: feedback
    });
  } catch (error) {
    console.error('Feedback submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during feedback submission'
    });
  }
};

// Get Student's Own Feedback
exports.getMyFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find({ studentId: req.user.id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: feedback.length,
      data: feedback
    });
  } catch (error) {
    console.error('Fetch feedback error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
