// Import the Firebase authentication module and the initialized Firebase auth instance
const firebaseAuth = require('firebase/auth');
const { auth } = require('./../services/firebaseService');

// Define and export the controller for handling sign-in
module.exports = {
    /**
     * post - Handles the sign-in of a user using email and password.
     *
     * This function extracts the email and password from the request body,
     * and attempts to sign in the user using Firebase Authentication's
     * signInWithEmailAndPassword method. It sends appropriate responses based
     * on whether the sign-in was successful or if there was an error.
     *
     * @param {Object} req - The request object, containing the user's email and password.
     * @param {Object} res - The response object, used to send responses back to the client.
     */
    post: (req, res) => {
        // Extract email and password from the request body
        const receivedData = req.body;
        const email = receivedData.email;
        const password = receivedData.password;

        // Attempt to sign in the user with the provided email and password
        firebaseAuth.signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                // Log success message and send response back to client
                console.log("Signed in successfully.");
                res.send(`User: ${email} signed in successfully.`);
            })
            .catch((error) => {
                // Handle different error cases
                if (error.code === "auth/invalid-credential") {
                    console.log("Invalid credentials.");
                    res.send("Invalid credentials.");
                } else if (error.code === "auth/user-disabled") {
                    console.log("User disabled.");
                    res.send("User disabled.");
                } else {
                    console.log(error);
                }
            });
    }
};
