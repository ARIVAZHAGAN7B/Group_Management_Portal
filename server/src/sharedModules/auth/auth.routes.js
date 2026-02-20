const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');
const validate = require('../../validation/validator.middleware');
const { loginSchema } = require('./auth.validator');
const { protect } = require('./auth.middleware');

router.post('/login', validate(loginSchema), authController.login);
router.post('/logout', authController.logout);
router.get('/me', protect, authController.getMe);

module.exports = router;
