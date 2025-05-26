const userService = require('../services/user.service');

exports.createUser = async (req, res) => {
  try {
    const { first_name, last_name, email, username, password } = req.body;

    if (!first_name || !last_name || !email || !username || !password) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    const newUser = await userService.createUser({ first_name, last_name, email, username, password });
    res.status(201).json({
      message: 'Usuario agregado con éxito',
      user: newUser
    });

  } catch (error) {
    res.status(500).json({ message: 'Error creando usuario', error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo usuarios', error: error.message });
  }
};
