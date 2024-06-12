const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./model');

const signIn = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username: username } });
    if (!user) {
      return res.status(404).json({
        message: 'Username dan Password salah',
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(404).json({
        message: 'Username dan Password salah',
      });
    }

    const token = jwt.sign({ id: user.id }, 'your_jwt_secret');
    return res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
    console.log(err);
  }
};
const signupUser = async (req, res) => {
  const { username, password, image } = req.body;
  try {
    // Cek apakah username sudah ada
    const check = await User.findOne({ where: { username } });
    if (check) {
      return res.status(400).json({ message: 'Nama duplikat' });
    }

    //hash sebelum di simpan di database
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPassword,
      image,
    });

    res.status(201).json({ message: 'Sukses membuat akun', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

const updateProfile = async (req, res) => {
  const username = req.params.username;
  const { image, password: newPassword } = req.body;
  try {
    const data = await User.findOne({ where: { username: username } });
    let password = !newPassword ? data.password : newPassword;

    const match = await bcrypt.hash(password, 10);

    await data.update({ image: image, password: match });
    await data.save();
    res.status(200).json({
      data: data,
    });
  } catch (err) {
    console.log('INTERNAL ERROR: ', err);
  }
};

module.exports = {
  signIn,
  signupUser,
  updateProfile,
};
