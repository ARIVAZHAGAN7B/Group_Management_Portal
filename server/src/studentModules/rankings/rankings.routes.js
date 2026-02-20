const express = require('express');
const router = express.Router();
const rankingsController = require('./rankings.controller');
const { protect } = require('../../sharedModules/auth/auth.middleware');

router.get('/individuals', protect, rankingsController.getIndividualRankings);
router.get('/leaders', protect, rankingsController.getLeaderRankings);
router.get('/groups', protect, rankingsController.getGroupRankings);

module.exports = router;
