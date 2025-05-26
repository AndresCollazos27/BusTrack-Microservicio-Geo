const pool = require('../config/db');
const bcrypt = require('bcryptjs');

exports.createUser = async ({ first_name, last_name, email, username, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const query = `
    INSERT INTO users (first_name, last_name, email, username, password)
    VALUES (?, ?, ?, ?, ?)
  `;

  const [result] = await pool.execute(query, [first_name, last_name, email, username, hashedPassword]);

  return { id: result.insertId, first_name, last_name, email, username };
};

exports.getAllUsers = async () => {
  const query = 'SELECT id, first_name, last_name, email, username, created_at FROM users';
  const [rows] = await pool.execute(query);
  return rows;
};

exports.getUserByUsername = async (username) => {
  const query = 'SELECT * FROM users WHERE username = ?';
  const [rows] = await pool.execute(query, [username]);
  return rows[0]; // devuelve usuario o undefined
};

exports.updateUser = async (id, { first_name, last_name, email, username, password }) => {
  let hashedPassword = password;

  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  const query = `
    UPDATE users
    SET first_name = ?, last_name = ?, email = ?, username = ?, password = ?
    WHERE id = ?
  `;

  await pool.execute(query, [first_name, last_name, email, username, hashedPassword, id]);
  return { id, first_name, last_name, email, username };
};


exports.deleteUser = async (id) => {
  const query = 'DELETE FROM users WHERE id = ?';
  await pool.execute(query, [id]);
  return { message: 'Usuario eliminado correctamente' };
};

exports.getUserById = async (id) => {
  const query = 'SELECT id, first_name, last_name, email, username FROM users WHERE id = ?';
  const [rows] = await pool.execute(query, [id]);
  return rows[0]; // devuelve usuario o undefined
};

