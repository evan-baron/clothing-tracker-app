// services/userService.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel'); // Import the User model

// Create a new user
const createUser = async (first_name, last_name, email, password) => {
  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the user in the database
  const result = await UserModel.createUser(first_name, last_name, email, hashedPassword);

  // Return user info (or any other response you want to send)
  return { id: result.insertId, first_name, last_name, email };
};

// Get a user by email
const getUserByEmail = async (email) => {
  return await UserModel.findUserByEmail(email);
};

// Get a user by first name and last name (concatenated)
const getUserByFirstLast = async (firstNamelastName) => {
  return await UserModel.findUserByFirstLast(firstNamelastName);
};

// Check if a user exists by email
const checkIfUserExists = async (email) => {
  return await UserModel.checkIfUserExists(email);
};

// Get user by ID
const getUserById = async (id) => {
  return await UserModel.findUserById(id);
};

// Delete a user by ID
const deleteUser = async (id) => {
  return await UserModel.deleteUserById(id);
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserByFirstLast,
  checkIfUserExists,
  getUserById,
  deleteUser
};
