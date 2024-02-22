const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    todo: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const todos = mongoose.models.todos || mongoose.model("todos", todoSchema);
module.exports = todos;
