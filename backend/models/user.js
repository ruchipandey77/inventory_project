const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Import bcrypt
const jwt = require('jsonwebtoken');
const crypto = require('crypto'); // If reset password functionality uses crypto



const UserSchema = new mongoose.Schema({

  
email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
},

password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    
    select: false,
},
siteName: {
  type: String,
  required: [true, "Please Enter Your SiteName"],
  
  
},

role: {
    type: String,
    default: "user",
},
createdAt: {
    type: Date,
    default: Date.now,
},
resetPasswordToken: String,
resetPasswordExpire: Date,




  // userName:{type:String},
  // siteName:{type:String,required:true},
  // location:{type:String},
  // email: {type: String, required: true ,unique:true},
  // password: { type: String, required: true },
});

// Hashing Password Before Saving
UserSchema.pre("save", async function (next) {

  if (!this.isModified("password")) {
      next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// JWT Token Method

UserSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE
  });
}
  
// Compare Password Method

UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}

// Reset Password Token Method

UserSchema.methods.getResetPasswordToken = async function () {

  // generate token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // generate hash token and add to db
  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
}

const User = mongoose.model('User', UserSchema);
module.exports = User;
