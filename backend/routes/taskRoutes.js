const express = require("express");
const Task = require("../models/Task");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user.id
    }).sort({ createdAt: -1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.post("/", protect, async (req, res) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      description: req.body.description,
      priority: req.body.priority,
      category: req.body.category,
      dueDate: req.body.dueDate,
      status: req.body.status || "Pending",
      user: req.user.id
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

router.put("/:id", protect, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id
      },
      {
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority,
        category: req.body.category,
        dueDate: req.body.dueDate,
        status: req.body.status
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found or you do not have permission"
      });
    }

    res.json(task);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

router.delete("/:id", protect, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found or you do not have permission"
      });
    }

    res.json({
      message: "Task deleted successfully"
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

module.exports = router;