const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const tokenBlackListModel = require("../models/blackList.model");

// verify token and attach user
async function authMiddleware(req, res, next) {

    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized access, token missing.",
            status: "failed"
        });
    }
 
    const isBlackListed = await tokenBlackListModel.findOne({ token });

    if (isBlackListed) {
        return res.status(401).json({
            message: "Unauthorized access, token is blacklisted.",
            status: "failed"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                message: "User not found",
                status: "failed"
            });
        }

        req.user = user;
        return next();

    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized access, invalid token.",
            status: "failed"
        });
    }
}


// system user middleware
async function authSystemUserMiddleware(req, res, next){

    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if(!token){
        return res.status(401).json({
            message: "Unauthorized access, token is missing"
        });
    }
 
    const isBlackListed = await tokenBlackListModel.findOne({ token });

    if (isBlackListed) {    
        return res.status(401).json({
            message: "Unauthorized access, token is blacklisted."
        });
    }

    try{

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decoded.id).select("+systemUser");

        if(!user || !user.systemUser){
            return res.status(403).json({
                message: "Forbidden access, system user only"
            });
        }

        req.user = user;

        return next();

    }
    catch(error){
        return res.status(401).json({
            message: "Unauthorized access, invalid token"
        });
    }
}

module.exports = { authMiddleware, authSystemUserMiddleware };