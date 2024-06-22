const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./model');

const signIn = async (req, res) => {
  const { username, password } = req.body;
  let success = false;
  try {
    const user = await User.findOne({ where: { username: username } });
    if (!user) {
      return res.status(401).json({
        message: 'Username dan Password salah',
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({
        message: 'Username dan Password salah',
      });
    }

    const token = jwt.sign({ id: user.id }, 'your_jwt_secret');
    if (token) {
      return res
        .status(200)
        .json({ success: (success = true), user: user, token: token });
    }
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
    console.log(err);
  }
};
const signupUser = async (req, res) => {
  const { username, password, image } = req.body;
  try {
    if (!password) {
      return res.status(401).json({
        message: 'Username atau Password tidak valid',
      });
    }

    const check = await User.findOne({ where: { username } });
    if (check) {
      return res.status(400).json({
        message: 'Username dan Password sudah ada',
      });
    }

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
    const user = await User.findOne({ where: { username: username } });

    let password;
    if (!newPassword) {
      password = user.password;
    } else {
      password = await bcrypt.hash(newPassword, 10);
    }

    await user.update({ image: image, password: password });
    const token = jwt.sign({ id: user.id }, 'your_jwt_secret');
    await user.save();
    res.status(200).json({
      user: user,
      token: token,
    });
  } catch (err) {
    console.log('INTERNAL ERROR: ', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  signIn,
  signupUser,
  updateProfile,
};
