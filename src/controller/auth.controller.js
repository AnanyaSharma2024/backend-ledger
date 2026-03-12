const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");


async function userRegisterController (req, res) {
  const { name, email, password } = req.body;
  const isExists = await userModel.findOne({ email });
  if (isExists) {
    return res.status(422).json({ message: "Email already exists", status: "failed" });
  }
  const user = await userModel.create({ name, email, password });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.cookie("token", token);
  return res.status(201).json({ message: "User registered successfully", status: "success" });

}



module.exports = { userRegisterController };