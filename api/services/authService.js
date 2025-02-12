const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userService = require('./userService'); // Import the userService to check if the user exists
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

// Login service function
const login = async (email, password) => {
    // Find the user by email
    const user = await userService.getUserByEmail(email);
    if (!user) {
        throw new Error('Invalid credentials');
    }

    // Compare the hashed password with the input password
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid credentials');
    }

    // Generate JWT token
    const token = jwt.sign(
        { id: user.id, first_name: user.first_name, last_name: user.last_name, email: user.email },
        JWT_SECRET,
        { expiresIn: '1h' } // Token expires in 1 hour
    );

    return { token }; // Return the generated token
};

module.exports = { login };
