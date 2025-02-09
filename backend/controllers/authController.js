const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Verifică dacă utilizatorul există deja
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Emailul este deja folosit' });
    }

    // Crearea unui nou utilizator
    const user = new User({ username, email, password });
    await user.save();

    // Generarea unui token JWT pentru utilizator
    const token = generateToken(user._id);

    // Returnarea unui răspuns cu token-ul
    res.status(201).json({
      message: 'Utilizator înregistrat cu succes',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Eroare la înregistrare' });
  }
};

// Funcția de autentificare
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Email sau parolă incorectă' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Email sau parolă incorectă' });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      message: 'Autentificare reușită',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Eroare la autentificare' });
  }
};

module.exports = { registerUser, loginUser };
