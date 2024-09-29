const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  
  try {
    const user = await User.create({ name, email, password: hashedPassword, role });
    res.json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Registration failed', error });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ success: false, message: 'Invalid password' });
    }
    const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });
    res.json({ success: true, token, message: 'Login successful' });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Login failed', error });
  }
});

module.exports = router;
