const Task = require('../models/taskModel');

const taskController = {
    registerTask: async (req, res) => {
        try {
            const {
                companyId,
                applicantId,
                taskId,
                taskTitle,
                stipendAmount,
                taskCategory,
                requiredSkills,
                taskDescription,
                responsibilities,
                whoYouAre,
                niceToHaves
            } = req.body;

            // Create a new task instance
            const newTask = new Task({
                companyId,
                applicantId,
                taskId,
                taskTitle,
                stipendAmount,
                taskCategory,
                requiredSkills,
                taskDescription,
                responsibilities,
                whoYouAre,
                niceToHaves
            });

            // Save the task to the database
            const savedTask = await newTask.save();

            // Log the saved task data to the console
            console.log("New task created:", savedTask);

            // Respond with the saved task data
            res.status(201).json(savedTask);
        } catch (error) {
            // Handle errors
            console.error("Error creating task:", error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    getAllTasks: async (req, res) => {
        try {
            const tasks = await Task.find();
            res.status(200).json(tasks);
        } catch (error) {
            console.error("Error fetching tasks:", error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    getTaskById: async (req, res) => {
        const { taskId } = req.params;
        try {
            const task = await Task.findOne({ taskId });
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }
            res.status(200).json(task);
        } catch (error) {
            console.error('Error fetching task:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    updateTaskById: async (req, res) => {
        const { taskId } = req.params;
        try {
            // Extract fields that can be updated from request body
            const {
                companyId,
                applicantId,
                taskTitle,
                stipendAmount,
                taskCategory,
                requiredSkills,
                taskDescription,
                responsibilities,
                whoYouAre,
                niceToHaves
            } = req.body;

            const updatedTask = await Task.findOneAndUpdate(
                { taskId },
                {
                    companyId,
                    applicantId,
                    taskTitle,
                    stipendAmount,
                    taskCategory,
                    requiredSkills,
                    taskDescription,
                    responsibilities,
                    whoYouAre,
                    niceToHaves
                },
                { new: true, runValidators: true }
            );

            if (!updatedTask) {
                return res.status(404).json({ message: 'Task not found' });
            }

            res.status(200).json(updatedTask);
        } catch (error) {
            console.error('Error updating task:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    deleteTaskById: async (req, res) => {
        const { taskId } = req.params;
        try {
            const deletedTask = await Task.findOneAndDelete({ taskId });
            if (!deletedTask) {
                return res.status(404).json({ message: 'Task not found' });
            }
            res.status(200).json({ message: 'Task deleted successfully' });
        } catch (error) {
            console.error('Error deleting task:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

module.exports = taskController;
