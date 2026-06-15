const jwt = require('jsonwebtoken');

// Verifies the JWT stored in the httpOnly `token` cookie and attaches the
// decoded payload (which contains `id`) to req.user.
const checkToken = (req, res, next) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized, no token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        return next();
    } catch (err) {
        return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
};

module.exports = checkToken;
