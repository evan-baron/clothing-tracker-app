const db = require('../config/db'); // Import db.js from the config folder
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Get all users
const getAllUsers = async () => {
    try {
        const [rows] = await db.query('SELECT id, first_name, last_name, email FROM users');
        return rows;
    } catch (error) {
        throw new Error('Error fetching users: ' + error.message);
    }
};

// Get user by firstname+lastname (firstnamelastname) format in URL
const getUserByFirstLast = async (firstNamelastName) => {
    try {
        // Query the user by first_name and last_name
        const [rows] = await db.query('SELECT * FROM users WHERE LOWER(CONCAT(first_name, last_name)) = ?', [firstNamelastName]);

        if (rows.length > 0) {
            const user = rows[0];  // Return the first matching user (assumes no duplicate names)
            return user;  // Directly return the user object
        } else {
            throw new Error('User not found');
        }
    } catch (error) {
        throw new Error('Error fetching user: ' + error.message);
    }
};


// Get a user by ID
const getUserById = async (id) => {
    try {
        const [rows] = await db.query('SELECT id, first_name, last_name, email FROM users WHERE id = ?', [id]);
        return rows.length ? rows[0] : null;
    } catch (error) {
        throw new Error('Error fetching user: ' + error.message);
    }
};

// Get a user by email
const checkIfUserExists = async (email) => {
    try {
        const [rows] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
        return rows.length > 0; // Return true if email is already in use, false otherwise
    } catch (error) {
        throw new Error('Error checking user existence: ' + error.message);
    }
};

// Create a new user
const createUser = async (first_name, last_name, email, password) => {
	const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const [result] = await db.query('INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)', [first_name, last_name, email, hashedPassword]);
        return { id: result.insertId, first_name, last_name, email };
    } catch (error) {
        throw new Error('Error creating user: ' + error.message);
    }
};

// Delete a user by ID
const deleteUser = async (id) => {
    try {
        const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
        return result.affectedRows > 0;
    } catch (error) {
        throw new Error('Error deleting user: ' + error.message);
    }
};

module.exports = {
    getAllUsers,
    getUserById,
	getUserByFirstLast,
	checkIfUserExists,
    createUser,
    deleteUser
};
