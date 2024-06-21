const User = require('../models/userModel');

const userController = {
    registerUser: async (req, res) => {
        try {
            // Extract data from the request body
            const {
                name,
                phone,
                gender,
                dateOfBirth,
                language,
                address,
                aboutme,
                currentTask,
                experience,
                skills,
                addDetails,
                socialLinks,
                education,
                portfolios,
                resume
            } = req.body;

            // Create a new user instance with the extracted data
            const newUser = new User({
                name,
                phone,
                gender,
                dateOfBirth,
                language,
                address,
                aboutme,
                currentTask,
                experience,
                skills,
                addDetails,
                socialLinks,
                education,
                portfolios,
                resume
            });

            // Save the new user to the database
            const savedUser = await newUser.save();

            // Respond with the saved user data
            console.log("New user registered on MongoDB!");
            res.status(201).json(savedUser);
        } catch (error) {
            // Handle errors, such as validation errors
            if (error.code === 11000) {
                res.status(400).json({ message: "User with this phone number already exists!" });
            } else if (error.name === 'ValidationError') {
                const messages = {};
                for (let field in error.errors) {
                    messages[field] = error.errors[field].message;
                }
                res.status(400).json({ message: "Validation failed", errors: messages });
            } else {
                res.status(400).json({ message: error.message });
            }
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            console.error("Error fetching users:", error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    getUserByPhone: async (req, res) => {
        const { phone } = req.params;
        try {
            const user = await User.findOne({ phone });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    updateUserByPhone: async (req, res) => {
        const { phone } = req.params;
        try {
            // Extract fields that can be updated from request body
            const {
                name,
                gender,
                dateOfBirth,
                language,
                address,
                aboutme,
                currentTask,
                experience,
                skills,
                addDetails,
                socialLinks,
                education,
                portfolios,
                resume
            } = req.body;

            const updatedUser = await User.findOneAndUpdate(
                { phone },
                {
                    name,
                    gender,
                    dateOfBirth,
                    language,
                    address,
                    aboutme,
                    currentTask,
                    experience,
                    skills,
                    addDetails,
                    socialLinks,
                    education,
                    portfolios,
                    resume
                },
                { new: true, runValidators: true }
            );

            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json(updatedUser);
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    deleteUserByPhone: async (req, res) => {
        const { phone } = req.params;
        try {
            const deletedUser = await User.findOneAndDelete({ phone });
            if (!deletedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

module.exports = userController;
