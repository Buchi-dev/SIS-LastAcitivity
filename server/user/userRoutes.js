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

// Auth routes
router.post('/login', loginUser);
router.post('/register', registerUser);

// User management routes
router.get('/', getUsers);
router.post('/', createUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;