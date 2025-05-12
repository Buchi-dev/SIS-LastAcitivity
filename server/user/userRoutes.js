const express = require('express');
const router = express.Router();
const {
  getUsers,
  loginUser,
  registerUser,
  createUser,
  updateUser,
  deleteUser
} = require('./userController');
const User = require('./user_Model');

// Auth routes
router.post('/login', loginUser);
router.post('/register', registerUser);

// Temporary route to check users (for debugging)
router.get('/check', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({ count: users.length, users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// User management routes
router.get('/', getUsers);
router.post('/', createUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;