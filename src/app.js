const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const locationRoutes = require('./routes/location.routes');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const authMiddleware = require('./middleware/auth.middleware');

const app = express();

// Seguridad
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // límite de 100 peticiones por IP
}));

// Rutas públicas
app.use('/api/auth', authRoutes);

// Rutas protegidas con JWT
app.use('/api/location', authMiddleware, locationRoutes);
app.use('/api/users', authMiddleware, userRoutes);

module.exports = app;
