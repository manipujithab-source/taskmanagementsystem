const dns = require("dns");

dns.setServers([
  "8.8.8.8",
  "8.8.4.4"
]);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());


// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Task Management API is running");
});


// AUTH ROUTES
app.use("/api/auth", authRoutes);


// TASK ROUTES
app.use("/api/tasks", taskRoutes);


// DATABASE CONNECTION
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch((error) => {
    console.log(
      "Database connection error:",
      error
    );
  });