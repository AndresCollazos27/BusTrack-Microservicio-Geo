const express = require('express');
const router = express.Router();
const locationController = require('../controller/location.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/', authMiddleware, locationController.getAllLocations);

router.get('/:deviceId', authMiddleware, locationController.getLocation);

router.post('/add', authMiddleware, locationController.createDevice);

module.exports = router;
