// Import the Firebase authentication module and the initialized Firebase auth instance
const firebaseAuth = require('firebase/auth');
const { auth } = require('./../services/firebaseService');

// Define and export the controller for handling user registration
module.exports = {
    /**
     * post - Handles the registration of a new user using email and password.
     *
     * This function extracts the email and password from the request body,
     * and attempts to create a new user using Firebase Authentication's
     * createUserWithEmailAndPassword method. It sends appropriate responses
     * based on whether the registration was successful or if there was an error.
     *
     * @param {Object} req - The request object, containing the user's email and password.
     * @param {Object} res - The response object, used to send responses back to the client.
     */
    post: (req, res) => {
        // Extract email and password from the request body
        const receivedData = req.body;
        const email = receivedData.email;
        const password = receivedData.password;

        // Attempt to create a new user with the provided email and password
        firebaseAuth.createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                // Log success message and send response back to client
                console.log("User created successfully.");
                res.send(`User: ${email} created successfully.`);
            })
            .catch((error) => {
                // Handle different error cases
                if (error.code === "auth/email-already-in-use") {
                    console.log("Email already in use");
                    res.send("Email already in use.");
                } else if (error.code === "auth/weak-password") {
                    console.log("Password is too weak");
                    res.send("Password is too weak.");
                } else if (error.code === "auth/invalid-email") {
                    console.log("Invalid Email.");
                    res.send("Invalid Email.");
                } else if (error.code === "auth/operation-not-allowed") {
                    console.log("Operation not allowed");
                    res.send("Operation not allowed.");
                } else {
                    console.log(error);
                    res.send("An unexpected error occurred.");
                }
            });
    }
};
