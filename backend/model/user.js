require("dotenv").config();
const validator = require("validator");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Name is required"],
      minLength: [2, "Min 2 char of name required"],
      maxLength: [50, "Max 50 char of name required"],
    },
    email: {
      type: String,
      require: [true, "email is required"],
      unique: true,
      validate: [validator.isEmail, "Please enter a valid email address"],
    },
    password: {
      type: String,
      minLength: [6, "Password should be more than 6 char"],
      maxLength: [18, "Password shouldn't be more than 18 char"],
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    console.log("this is password: ", this.password);
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJwtToken = function () {
  return JWT.sign({ id: this._id }, process.env.JWE_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

userSchema.methods.isValidPassword = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};

module.exports = mongoose.model("user", userSchema);
