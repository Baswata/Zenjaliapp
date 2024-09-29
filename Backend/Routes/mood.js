const express = require('express');
const MoodEntry = require('../models');
const router = express.Router();

router.post('/track', async (req, res) => {
  const { moodScore, description } = req.body;
  try {
    const mood = await MoodEntry.create({
      userId: req.user.id, // Assuming you have user data from JWT token
      moodScore,
      description,
      createdAt: new Date()
    });
    res.json({ success: true, message: 'Mood entry added', mood });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error tracking mood', error });
  }
});

module.exports = router;
