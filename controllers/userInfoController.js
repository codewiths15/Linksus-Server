const User = require('./../models/userModel');

// Define the controller methods
const userInfoController = {
    post: async (req, res) => {
        try {
            // Create a new user instance with the data from the request body
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                aboutme: req.body.aboutme,
                experience: req.body.experience,
                skills: req.body.skills,
                addDetails: req.body.addDetails,
                socialLinks: req.body.socialLinks,
                education: req.body.education,
                portfolios: req.body.portfolios,
                resume: req.body.resume
            });

            // Save the new user to the database
            const savedUser = await newUser.save();
            
            // Respond with the saved user data
            console.log("New user registered on MongoDB!");
            res.status(201).json(savedUser);
        } catch (error) {
            // Handle errors, such as validation errors
            if (error.code===11000){
                res.status(400).json({"message": "User with email already exists!"})
            } 
            else if (error.name === 'ValidationError') {
                const messages = {};
                for (let field in error.errors) {
                    messages[field] = error.errors[field].message;
                }
                res.status(400).json({ message: "Validation failed", errors: messages });
            }
            else {
                res.status(400).json({ message: error });
            }
        }
    }
};

module.exports = userInfoController;
