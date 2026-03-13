const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    unique: [true, "Username already exists"] 
  },

  email: { 
    type: String, 
    required: [true, "Email is required"], 
    unique: [true, "Email already exists"],
    trim: true,
    lowercase: true,
    match: [/.+@.+\..+/, "Please enter a valid email address"]
  },

  password: { 
    type: String, 
    required: [true, "Password is required"], 
    minlength: [6, "Password must be at least 6 characters long"], 
    select: false 
  }

}, { timestamps: true });


// password hashing middleware
userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
});


// password compare method
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
}

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;