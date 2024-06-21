// Import the required modules
const express = require("express");
const router = express.Router();

// Import the controllers for handling register and sign-in logic
const authController = require('./../Company/controllers/authController');

// Define the route for user registration
// This route handles POST requests to /userAuth/register
// The logic for registration is handled by the register method in authController
router.post("/register", authController.register);

// Define the route for user sign-in
// This route handles POST requests to /userAuth/signin
// The logic for sign-in is handled by the signIn method in authController
router.post("/signin", authController.signIn);

// Export the router so it can be used in other parts of the application
module.exports = router;
