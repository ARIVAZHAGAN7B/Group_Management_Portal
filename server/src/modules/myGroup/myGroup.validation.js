const Joi = require('joi');

// Placeholder for future validations
exports.updateGroupSchema = Joi.object({
    name: Joi.string().min(3).max(50),
    status: Joi.string().valid('Active', 'Inactive', 'Pending')
});
