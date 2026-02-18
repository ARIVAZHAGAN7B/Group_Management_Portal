const Joi = require('joi');

// Placeholder for future validations (filtering, etc.)
exports.getGroupsSchema = Joi.object({
    tier: Joi.string(),
    status: Joi.string(),
    search: Joi.string()
});
