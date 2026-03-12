const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: [true, "Username already exists"] },
  email: { type: String, required: [true, "Email is required"], unique: [true, "Email already exists"] },
  trim: true,
  lowercase: true,
  match: [/.+@.+\..+/, "Please enter a valid email address"],
  password: { type: String, required: [true, "Password is required"], minlength: [6, "Password must be at least 6 characters long"], select: false },
}, { timestamps: true });

//agar user ka password change hua hoga toh hash krdo
//idhar 10 means salt rounds, jitna zyada hoga utna secure hoga but hashing me time lagega
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;//password ko hash krke save krdo
  //next() is used to move to the next middleware in the stack, if there are any. If there are no more middlewares, it will proceed to save the document in the database.
  return next();

});

userSchema.methods.comparePassword = async function (password) {
  //this.password is the hashed password stored in the database, and password is the plain text password that the user is trying to authenticate with. The bcrypt.compare function will hash the plain text password and compare it with the stored hashed password, returning true if they match and false otherwise.
  return await bcrypt.compare(password, this.password);
}

  const userModel = mongoose.model("User", userSchema);

  module.exports = userModel;


