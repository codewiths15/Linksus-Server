// Import the Firebase authentication module and the initialized Firebase auth instance
const firebaseAuth = require('firebase/auth');
const { auth } = require('../../services/firebaseService');

// Define and export the controller for handling user registration and sign-in
const authController = {
    register: function (req, res) {
        const { email, password } = req.body;

        firebaseAuth.createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                console.log("User created successfully.");
                res.status(201).send(`User: ${email} created successfully.`);
            })
            .catch((error) => {
                let errorMessage = "An unexpected error occurred.";
                switch (error.code) {
                    case "auth/email-already-in-use":
                        errorMessage = "Email already in use.";
                        break;
                    case "auth/weak-password":
                        errorMessage = "Password is too weak.";
                        break;
                    case "auth/invalid-email":
                        errorMessage = "Invalid Email.";
                        break;
                    case "auth/operation-not-allowed":
                        errorMessage = "Operation not allowed.";
                        break;
                    default:
                        console.log(error);
                }
                console.log(errorMessage);
                res.status(400).send(errorMessage);
            });
    },

    signIn: function (req, res) {
        const { email, password } = req.body;

        firebaseAuth.signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                console.log("Signed in successfully.");
                res.status(200).send(`User: ${email} signed in successfully.`);
            })
            .catch((error) => {
                let errorMessage = "An unexpected error occurred.";
                switch (error.code) {
                    case "auth/invalid-credential":
                        errorMessage = "Invalid credentials.";
                        break;
                    case "auth/user-disabled":
                        errorMessage = "User disabled.";
                        break;
                    default:
                        console.log(error);
                }
                console.log(errorMessage);
                res.status(400).send(errorMessage);
            });
    }
};

module.exports = authController;
