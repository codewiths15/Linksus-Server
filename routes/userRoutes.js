// Import the required modules
const express = require("express");
const router = express.Router();

// Define the route for user registration
// This route handles POST requests to /profileLink
// The logic for user model is handled by the post method in userInfoController
const userController = require("./../Freelancer/controllers/userController")
router.post("/profileLink", userController.post)

// Export the router so it can be used in other parts of the application
module.exports = router;