// Import the Firebase library
const firebase = require("firebase/app");

// Import the 'dotenv' package to load environment variables from a .env file
require('dotenv').config();

/**
 * Firebase configuration object.
 * Contains all the necessary keys and identifiers for Firebase services.
 * These values are loaded from environment variables for security purposes.
 */
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY, // Firebase API Key
  authDomain: process.env.FIREBASE_AUTH_DOMAIN, // Firebase Auth Domain
  projectId: process.env.FIREBASE_PROJECT_ID, // Firebase Project ID
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET, // Firebase Storage Bucket
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID, // Firebase Messaging Sender ID
  appId: process.env.FIREBASE_APP_ID, // Firebase App ID
  measurementId: process.env.FIREBASE_MEASUREMENT_ID // Firebase Measurement ID
};

// Initialize Firebase with the configuration object
const app = firebase.initializeApp(firebaseConfig);

// Uncomment the line below if you want to use Firebase Analytics
// const analytics = firebase.analytics();

// Export the initialized Firebase app instance for use in other modules
module.exports = { app };
