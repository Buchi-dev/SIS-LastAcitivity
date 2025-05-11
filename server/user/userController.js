const User = require('./user_Model');

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    const { password: userPassword, ...userWithoutPassword } = user.toObject();
    res.json({ user: userWithoutPassword });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Register new user
const registerUser = async (req, res) => {
  try {
    const { email, password, firstName, lastName, middleName, userId } = req.body;
    
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const existingUserId = await User.findOne({ userId });
    if (existingUserId) {
      return res.status(400).json({ message: 'User ID already exists' });
    }
    
    const user = new User({ 
      userId,
      email,
      password,
      firstName,
      lastName,
      middleName
    });
    
    const newUser = await user.save();
    const { password: userPassword, ...userWithoutPassword } = newUser.toObject();
    res.status(201).json({ user: userWithoutPassword });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Create user
const createUser = async (req, res) => {
  try {
    const { email, userId } = req.body;
    
    // Check for existing email
    const existingEmail = await User.findOne({ email: email.toLowerCase() });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Check for existing userId
    const existingUserId = await User.findOne({ userId });
    if (existingUserId) {
      return res.status(400).json({ message: 'User ID already exists' });
    }

    // Generate userId if not provided
    if (!userId) {
      req.body.userId = 'USR' + Date.now().toString().slice(-6);
    }
    
    const user = new User({
      ...req.body,
      email: email.toLowerCase()
    });
    
    const newUser = await user.save();
    const { password, ...userWithoutPassword } = newUser.toObject();
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    res.status(400).json({ 
      message: error.message || 'Error creating user',
      details: error.errors
    });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    Object.assign(user, req.body);
    const updatedUser = await user.save();
    const { password, ...userWithoutPassword } = updatedUser.toObject();
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    await user.deleteOne();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  loginUser,
  registerUser,
  createUser,
  updateUser,
  deleteUser
};