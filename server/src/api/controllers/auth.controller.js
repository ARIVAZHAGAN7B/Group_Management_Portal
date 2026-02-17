const authService = require('../services/auth.service');

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await authService.loginUser(email, password);

        // Set cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        res.status(200).json({
            status: 'success',
            data: { user }
        });
    } catch (error) {
        next(error);
    }
};

exports.logout = (req, res) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    res.status(200).json({ status: 'success', message: 'Logged out' });
};

exports.getMe = async (req, res, next) => {
    try {
        res.status(200).json({
            status: 'success',
            data: { user: req.user }
        });
    } catch (error) {
        next(error);
    }
};
