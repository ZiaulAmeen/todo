const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      require: true,
    },
    password: {
      type: String,
      unique: true,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const users = mongoose.models.users || mongoose.model("users", userSchema);
module.exports = users;
