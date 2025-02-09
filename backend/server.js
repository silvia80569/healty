const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const nutritionRoutes = require('./routes/nutritionRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
// Configurarea Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Health API',
      version: '1.0.0',
      description: 'Documentație pentru API-ul Health',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',  // Specifică formatul token-ului
        },
      },
    },
    security: [
      {
        bearerAuth: [],  // Aplică securitatea la nivel global
      },
    ],
  },
  apis: ['./routes/*.js'], // Include fișierele de rute pentru documentație
};

const swaggerSpec = swaggerJsdoc(options);

// Configurarea Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use(express.json());
app.use(cors());


app.use('/api/auth', authRoutes);

app.use('/api/nutrition', nutritionRoutes);

mongoose.connect(process.env.DB_URI)
  .then(() => console.log('✅Connected to MongoDB'))
  .catch((err) => console.log('❌ Connection error: ', err));



app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});