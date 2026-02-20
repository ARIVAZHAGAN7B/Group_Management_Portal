const express = require('express');
const router = express.Router();
const myGroupController = require('./myGroup.controller');
const { protect } = require('../../sharedModules/auth/auth.middleware');

router.get('/', protect, myGroupController.getGroupDetails);

module.exports = router;
