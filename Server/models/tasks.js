const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  title: String,
  deadline: String,
});

module.exports = mongoose.model("Task", taskSchema);