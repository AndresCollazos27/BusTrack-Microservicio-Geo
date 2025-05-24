const express = require('express');
const router = express.Router();
const locationController = require('../controller/location.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', authMiddleware, locationController.getAllLocations);

router.get('/:deviceId', authMiddleware, locationController.getLocation);

module.exports = router;
