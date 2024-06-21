const express = require('express');
const taskController = require('../controllers/taskController');

const router = express.Router();

router.post('/register', taskController.registerTask);
router.get('/', taskController.getAllTasks);
router.get('/:taskId', taskController.getTaskById);
router.put('/:taskId', taskController.updateTaskById);
router.delete('/:taskId', taskController.deleteTaskById);

module.exports = router;
