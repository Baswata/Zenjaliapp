const { DataTypes } = require('sequelize');
const sequelize = require('./db');

// Define the User model
const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        unique: true,
    },
    password: DataTypes.STRING,
    role: DataTypes.ENUM('Client', 'Therapist')
});

// Define the MoodEntry model
const MoodEntry = sequelize.define('MoodEntry', {
    userId: {
        type: DataTypes.INTEGER,  // Use DataTypes here instead of DataType
        allowNull: false,
        references: {
            model: 'Users',  // Ensure that the model name is correct, typically should match User model (lowercase "users" if auto-generated table name)
            key: 'id'
        }
    },
    moodScore: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    createdAt: DataTypes.DATE
});

// Export both models
module.exports = { User, MoodEntry };
