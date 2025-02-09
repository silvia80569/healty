const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectat la MongoDB'))
  .catch((err) => console.log('Eroare la conectare: ', err));

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Serverul rulează pe portul ${PORT}`);
});