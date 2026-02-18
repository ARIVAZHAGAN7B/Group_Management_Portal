const express = require('express');
const router = express.Router();
const groupsController = require('./groups.controller');
const { protect } = require('../auth/auth.middleware');

router.get('/', protect, groupsController.getAllGroups);

module.exports = router;
