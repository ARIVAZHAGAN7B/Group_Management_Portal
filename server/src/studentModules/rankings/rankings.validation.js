const Joi = require('joi');

exports.getRankingsSchema = Joi.object({
    tier: Joi.string(),
    search: Joi.string()
});
