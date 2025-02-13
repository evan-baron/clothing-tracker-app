// models/userModel.js
const pool = require('../config/db');

const User = {
  // Create a new user
  async createUser(first_name, last_name, email, passwordHash) {
    const [result] = await pool.execute(
      'INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)',
      [first_name, last_name, email, passwordHash]
    );
    return result;
  },

  // Get a user by ID
  async findUserById(id) {
    const [rows] = await pool.execute(
      'SELECT id, first_name, last_name, email FROM users WHERE id = ?',
      [id]
    );
    return rows[0];
  },

  // Get a user by email
  async findUserByEmail(email) {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return rows[0]; // Return the first matching user (or null if none)
  },

  // Get a user by first name and last name
  async findUserByFirstLast(firstNamelastName) {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE LOWER(CONCAT(first_name, last_name)) = ?',
      [firstNamelastName]
    );
    return rows.length > 0 ? rows[0] : null; // Return the first matching user
  },

  // Check if a user exists by email
  async checkIfUserExists(email) {
    const [rows] = await pool.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );
    return rows.length > 0; // Return true if email exists, otherwise false
  },

  // Delete a user by ID
  async deleteUserById(id) {
    const [result] = await pool.execute(
      'DELETE FROM users WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0;
  }
};

module.exports = User;
