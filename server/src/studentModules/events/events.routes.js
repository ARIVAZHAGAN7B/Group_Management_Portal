const express = require('express');
const router = express.Router();
const eventsController = require('./events.controller');
const { protect } = require('../../sharedModules/auth/auth.middleware');

router.get('/', protect, eventsController.getAllEvents);
router.get('/:id/teams', protect, eventsController.getEventTeams);

module.exports = router;
