const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Verifică dacă utilizatorul există deja
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crearea unui nou utilizator
    const user = new User({ username, email, password });
    await user.save();

    // Generarea unui token JWT pentru utilizator
    const token = generateToken(user._id);

    // Returnarea unui răspuns cu token-ul
    res.status(201).json({
      message: "User successfully registered",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registration error" });
  }
};

// Funcția de autentificare
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Incorrect email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect email or password" });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login error" });
  }
};

const logoutUser = (req, res) => {
  res.status(200).json({ message: "Logout succeessful" });
};

module.exports = { registerUser, loginUser, logoutUser };
