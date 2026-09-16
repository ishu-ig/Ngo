const jwt = require("jsonwebtoken");

function verifyAdmin(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send({
            result: "Fail",
            reason: "Access Denied. No token provided."
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY_ADMIN);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).send({
            result: "Fail",
            reason: "Invalid or expired token."
        });
    }
}

function verifyUser(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send({
            result: "Fail",
            reason: "Access Denied. No token provided."
        });
    }

    try {
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET_KEY_ADMIN);
        } catch (e) {
            decoded = jwt.verify(token, process.env.JWT_SECRET_KEY_BUYER);
        }
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).send({
            result: "Fail",
            reason: "Invalid or expired token."
        });
    }
}

module.exports = {
    verifyAdmin,
    verifyUser
};
