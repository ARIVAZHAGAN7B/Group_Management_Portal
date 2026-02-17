const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        const message = error.details.map((detail) => detail.message).join(', ');
        const err = new Error(message);
        err.status = 400;
        return next(err);
    }
    next();
};

module.exports = validate;
