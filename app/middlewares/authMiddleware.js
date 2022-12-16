const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const db = require("../models");
const User = db.user;

const Op = db.Sequelize.Op;
const bypass = ['/api/notification/device', '/api/pagewidget'];


const protect = asyncHandler(async (req, res, next) => {
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findOne({
                where: { id: decoded.id },
                raw: true,
            });

        } catch (error) {
            const tokenExpired = error.name === 'TokenExpiredError';
            console.error(`Error Authenticating Token :: ${error}`);
            return res.status(401).json({ message: "Unauthorised", tokenExpired });
        }
    }


    if ((!req.user || !req.user.id) && !bypass.includes(req.originalUrl.split('?').shift())) {
        return res.status(401).json({ message: "Unauthorised" });
    }

    next();
});


const admin = (req, res, next) => {
    if (req.user && req.user.role === "ADMIN") {
        next();
    } else {
        return res.status(401).json({ message: "Unauthorised" });
    }
};


module.exports = { protect, admin };
