const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      default: ""
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium"
    },

    category: {
      type: String,
      default: "Work"
    },

    dueDate: {
      type: Date
    },

    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Task", taskSchema);