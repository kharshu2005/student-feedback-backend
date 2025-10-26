const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { authMiddleware } = require('../middleware/auth');
const {
  submitFeedback,
  getMyFeedback
} = require('../controllers/feedbackController');

// Feedback validation rules
const feedbackValidation = [
  body('courseName').trim().notEmpty().withMessage('Course name is required'),
  body('facultyName').trim().notEmpty().withMessage('Faculty name is required'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comments').trim().isLength({ min: 10 }).withMessage('Comments must be at least 10 characters')
];

// Routes (all protected - require authentication)
router.post('/submit', authMiddleware, feedbackValidation, submitFeedback);
router.get('/my-feedback', authMiddleware, getMyFeedback);

module.exports = router;
