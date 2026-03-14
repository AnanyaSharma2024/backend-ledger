const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const emailService = require("../services/email.service");
const tokenBlackListModel = require("../models/blackList.model");

//this controller will handle user registration
async function userRegisterController(req, res) {
  try {
    const { name, email, password } = req.body;

    const isExists = await userModel.findOne({ email });

    if (isExists) {
      return res.status(422).json({
        message: "Email already exists",
        status: "failed"
      });
    }

    const user = await userModel.create({ name, email, password });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token);

    await emailService.sendRegistrationEmail(user.email, user.name);

    return res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      },
      token
    });
    

  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
}

//this controller will handle user login
async function userLoginController(req, res) {
  try {
    const { email, password } = req.body;
    //select +password because we have set select: false in user model toh usko explicitly select karna padega
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        message: "User not found",
        status: "failed"
      });
    } 
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({
        message: "Invalid password",
        status: "failed"
      });
    }
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET, { expiresIn: "1d" }
    );

    res.cookie("token", token);

    return res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      },
      token
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
}
//this controller will handle user logout
async function userLogoutController(req, res) {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(400).json({
      message: "User is not logged in",
      status: "failed"
    });
  }
  
  //clear token 
  res.clearCookie("token");
  //add token to blacklist
  await tokenBlackListModel.create({ token });
  
  
  return res.status(200).json({
    message: "User logged out successfully"
  });
}

module.exports = { userRegisterController, userLoginController, userLogoutController };










