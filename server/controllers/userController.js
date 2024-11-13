const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { logActivity } = require('../services/dashboardService'); // Import logActivity function

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// User Registration (Create User)
exports.registerUser = async (req, res) => {
  try {
     
    const { username, email, password, phoneNumber, role, status } = req.body;
    
  
    const existingUserByUsername = await User.findByUsername(username);
    const existingUserByEmail = await User.findByEmail(email);
    const existingUserByPhoneNumber = await User.findByPhoneNumber(phoneNumber);

    if (existingUserByUsername || existingUserByEmail || existingUserByPhoneNumber) {
      return res.status(409).json({ message: 'Username, Email, or Phone number already exists' });
    }

   
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      username,
      email,
      password: hashedPassword,
      phoneNumber,
      role: role || 'user', // Default to 'user' role
      status: status || 'active'
    };

    // Create new user in the database
    const userId = await User.create(newUser);
    
    // Log the registration activity with the username
    await logActivity(userId, `${username} registered successfully...`);

    // Generate JWT token
    const token = jwt.sign({ id: userId, role: newUser.role }, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: error.message });
  }
};

// User login
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findByUsername(username);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (user.status === 'inactive') {
            return res.status(403).json({ message: 'Your account is deactivated. Please contact support.' });
    }

    // Check if the password matches
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      // Log failed login attempt with the username
      await logActivity(user.id, `Failed login attempt for user: ${username}`);
      return res.status(400).json({ message: 'Incorrect password' });
    }

    // Log successful login with the username
    await logActivity(user.id, `${username} logged in successfully...`);

    // Generate JWT token
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    // Redirect based on user role
    if (user.role === 'admin') {
      return res.status(200).json({ message: 'Login successful', token, redirectUrl: '/admin.html' });
    } else {
      return res.status(200).json({ message: 'Login successful', token, redirectUrl: '/client.html' });
    }
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: error.message });
  }
};
