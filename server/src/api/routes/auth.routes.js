const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const validate = require('../middlewares/validator.middleware');
const { loginSchema } = require('../validators/auth.validator');
const { protect } = require('../middlewares/auth.middleware');

router.post('/login', validate(loginSchema), authController.login);
router.post('/logout', authController.logout);
router.get('/me', protect, authController.getMe);

module.exports = router;
