const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', authMiddleware, userController.getAllUsers);

router.post('/add', authMiddleware, userController.createUser);

module.exports = router;
