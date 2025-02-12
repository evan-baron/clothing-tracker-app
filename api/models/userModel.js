const pool = require('../config/db');

const User = {
  async createUser(first_name, last_name, email, passwordHash) {
    const [result] = await pool.execute(
      'INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)',
      [first_name, last_name, email, passwordHash]
    );
    return result;
  },

  async findUserById(id) {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );
    return rows[0];
  }
};

module.exports = User;