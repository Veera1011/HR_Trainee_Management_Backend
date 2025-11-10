const jwt = require('jsonwebtoken');

const authmiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    const usertoken = token && token.split(' ')[1];

    if (!usertoken) {
        return res.status(401).json({ success: false, message: 'No token' });
    }

    try {
        const decoded = jwt.verify(usertoken, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ success: false, message: 'Invalid' });
    }
};

module.exports = authmiddleware;
