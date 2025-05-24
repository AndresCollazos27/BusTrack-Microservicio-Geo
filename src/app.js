const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const locationRoutes = require('./routes/location.routes');
const authRoutes = require('./routes/auth.routes');
const app = express();

// Seguridad
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
}));

// Rutas
app.use('/api/location', locationRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;
