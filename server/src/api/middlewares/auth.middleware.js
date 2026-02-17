const authService = require('../services/auth.service');

exports.protect = async (req, res, next) => {
    try {
        let token;

        if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }

        if (!token) {
            const error = new Error('Not authorized to access this route');
            error.status = 401;
            throw error;
        }

        try {
            // 2) Verify token
            const decoded = authService.verifyToken(token);

            // 3) Check if user still exists (mock)
            const currentUser = await authService.getUserById(decoded.id);
            if (!currentUser) {
                const error = new Error('The user belonging to this token does no longer exist');
                error.status = 401;
                throw error;
            }

            req.user = currentUser;
            next();
        } catch (err) {
            const error = new Error('Not authorized to access this route');
            error.status = 401;
            throw error;
        }
    } catch (error) {
        next(error);
    }
};
