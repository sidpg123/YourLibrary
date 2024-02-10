const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");

const   authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ message: 'Token not found.  middleware' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (decoded) {
            const userId = decoded.userId;
            req.userId = userId;
            console.log("inside the middleware");
            next();
        } else {
            return res.status(403).json({ message: 'Token invalid' });
        }
    } catch (err) {
        console.error("Error in the authMiddleware:", err);
        if (err.name === 'JsonWebTokenError') {
            return res.status(403).json({ message: 'Token invalid' });
        } else if (err.name === 'TokenExpiredError') {
            return res.status(403).json({ message: 'Token expired' });
        } else {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
};

module.exports = {
    authMiddleware
};
