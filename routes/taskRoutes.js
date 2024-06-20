const express = require("express");
const router = express.Router();

const taskController = require("../controllers/taskController");
router.post("/task", taskController.post);

module.exports = router;