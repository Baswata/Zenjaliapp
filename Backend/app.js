const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./db');
const path = require('path');

const authRoutes = require('./routes/auth');
const moodRoutes = require('./routes/mood');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../Frontend')));

app.use('/api/auth', authRoutes);
app.use('/api/mood', moodRoutes);

// Corrected lines
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../Frontend', 'login.html')); // Fixed this line
});
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname,'../Frontend', 'register.html')); // Fixed this line
});
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '../Frontend', 'index.html')); // Fixed this line
});

sequelize.sync()
    .then(() => console.log('Database synced'))
    .catch(err => console.log('Error: ' + err));

app.listen(4000, () => {
    console.log('Server is running on http://localhost:4000');
});
