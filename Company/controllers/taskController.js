const Task = require('../models/taskModel');

const taskController = {
    post: async (req, res) => {
        try {
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

            // Create a new task instance
            const newTask = new Task({
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
    }
};

module.exports = taskController;
