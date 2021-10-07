const Task = require("../models/tasks");

module.exports = class API {
    // fetch all tasks
    static async fetchAllTasks(req, res) {
        try {    
          const tasks = await Task.find();
          res.status(200).json(tasks);
        } catch (err) {
          res.status(404).json({
            message: err.message,
          });
        }
      }
    
    // fetch task by ID
    static async fetchTaskByID(req, res) {
        const id = req.params.id;
        try {
            const task = await Task.findById(id);
            res.status(200).json(task);
        } catch (err) {
            res.status(404).json({
            message: err.message,
            });
        }
    }
    
    // create a task
    static async createTask(req, res) {
        const task = req.body;
        try {
          await Task.create(task);
          res.status(201).json({ message: "Task created successfully" });
        } catch (err) {
          res.status(400).json({ message: err.message });
        }
      }
    
    // update a task
    static async updateTask(req, res) {
      try {
        const task = await Task.findById(req.params.id)
        if (task === null) {
          res.status(404).json({
            message: 'There is no such task!'})
      } else {
        const id = req.params.id;
        const newTask = req.body;
        try {
          await Task.findByIdAndUpdate(id, newTask);
          res.status(200).json({ message: "Task updated successfully" });
        } catch (err) {
          res.status(404).json({ message: err.message });
        } 
      }
    } catch(err) {res.status(404).json({
        message: err.message,})}
      }
    
    // delete a task
    static async deleteTask(req, res) {
      try {
        const task = await Task.findById(req.params.id)
        if (task === null) {
          res.status(404).json({
            message: 'There is no such task!'})
      } else {
        try {
          const id = req.params.id;
          const result = await Task.findByIdAndDelete(id);
        res.status(200).json({ message: "Task deleted successfully" });
      } catch (err) {
        res.status(404).json({ message: err.message });
      };
      }
      } catch(err) {res.status(404).json({
        message: err.message,})}
    }
};