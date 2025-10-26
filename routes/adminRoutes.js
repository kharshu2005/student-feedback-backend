const express = require('express');
const router = express.Router();
const { authMiddleware, isAdmin } = require('../middleware/auth');
const {
  loginAdmin,
  getAllStudents,
  getAllFeedback,
  createAdmin
} = require('../controllers/adminController');

// Routes
router.post('/login', loginAdmin);
router.post('/create', createAdmin); // One-time use to create admin
router.get('/students', authMiddleware, isAdmin, getAllStudents);
router.get('/feedback', authMiddleware, isAdmin, getAllFeedback);

module.exports = router;
