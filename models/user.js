const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  its: {
    type: Number,
    required: true,
  },
  hof: {
    type: Number,
    required: true,
  },
  is_hof: {
    type: Boolean,
    default: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["MUMINEEN", "ADMIN", "AMILSAHEB", "JAMAAT"],
    default: "MUMINEEN",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
