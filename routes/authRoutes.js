// Import the required modules
const express = require("express");
const router = express.Router();

// Import the controllers for handling register and sign-in logic
const registerController = require("../controllers/registerController");
const signinController = require("../controllers/signinController");

// Define the route for user registration
// This route handles POST requests to /userAuth/register
// The logic for registration is handled by the post method in registerController
router.post("/register", registerController.post);

// Define the route for user sign-in
// This route handles POST requests to /userAuth/signin
// The logic for sign-in is handled by the post method in signinController
router.post("/signin", signinController.post);

// Export the router so it can be used in other parts of the application
module.exports = router;
