const express = require("express");
const router = express.Router();
const API = require("../controllers/tasks_api");
const multer = require("multer");

// multer middleware
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads");
    },
  });
  
  let upload = multer({
    storage: storage,
  }).single('uploaded_file')

router.get("/", API.fetchAllTasks);
router.get("/:id", API.fetchTaskByID);
router.post("/", upload, API.createTask);
router.patch("/:id", upload, API.updateTask);
router.delete("/:id", API.deleteTask);

module.exports = router;
