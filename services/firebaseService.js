// Import the Firebase Authentication library from the Firebase SDK
const firebaseAuth = require("firebase/auth");

// Import the initialized Firebase app instance from the firebase-adminsdk module
const { app } = require('../firebase-adminsdk');

/**
 * Initialize Firebase Authentication.
 * Uses the initialized Firebase app instance.
 */
const auth = firebaseAuth.getAuth(app);

/**
 * Export the initialized Firebase Authentication instance for use in other modules.
 */
module.exports = { auth };