const User = require('./model');

const createUser = async (req, res) => {
  try {
    const { username, password, image } = req.body;

    // Cek apakah username sudah ada
    const check = await User.findOne({ where: { username } });
    if (check) {
      return res.status(400).json({ message: 'Nama duplikat' });
    }

    const newUser = await User.create({ username, password, image });

    res.status(201).json({ message: 'Sukses membuat akun', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'password', 'image'],
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'username', 'password', 'image'],
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
};
