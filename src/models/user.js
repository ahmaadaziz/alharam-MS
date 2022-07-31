const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Provide Name of User"],
    trim: true,
    lowercase: true,
  },
  collected: [{ type: mongoose.Schema.Types.ObjectId, ref: "Record" }],
  tab: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tab" }],
  email: {
    type: String,
    unique: [true, "Email alraedy used"],
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email address");
      }
    },
  },
  password: {
    type: String,
    trim: true,
  },
});

//Remove password before returning User object
userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

// Populate before saving
// userSchema.pre("save", async function (next) {
//   const user = this;
//   if (user.favourites.length > 0) {
//     await user.populate("favourites");
//   }
//   if (user.orders.length > 0) {
//     await user.populate("orders");
//   }
//   next();
// });

//Hash password before saving
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

//Methods on User Object
userSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET);
  await this.save();
  return token;
};

//Methods on User Schema
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("No user found with this email");
  await user.populate("favourites");
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Incorrect email/password");
  }

  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
