const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

//this middleware will verify the token and set the user in req.user
async function authMiddleware(req, res, next) {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized access, token missing.",
            status: "failed"
        });
    }
    //verify the token and set the user in req.user
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);
        req.user = user;
        return next();
        
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized access, invalid token.",
            status: "failed"
        });
    }
}



module.exports = authMiddleware;