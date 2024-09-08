require('dotenv').config();
const express = require("express");
const path = require('path');

const bodyParser = require("body-parser");
const cors = require("cors");

const http = require('http');
const connectDB = require("./config/database");
const setupSocket = require("./config/socket");

const app = express();

// Middleware setup
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Route setup
const authRoute = require("./Company/routes/authRoutes");
app.use("/auth", authRoute);

const userRoute = require("./Freelancer/routes/userRoutes");
app.use("/user", userRoute);

const companyRoute = require("./Company/routes/companyRoutes");
app.use("/company", companyRoute);

const taskRoute = require("./Company/routes/taskRoutes");
app.use("/tasks", taskRoute);

const chatRoute = require("./Freelancer/routes/chatRoutes");
app.use("/chat", chatRoute);

const applicantRoute = require("./Company/routes/applicantRoutes");
app.use("/applicant", applicantRoute)

// Connect to MongoDB
connectDB();

// Create HTTP server
const server = http.createServer(app);

// Setup Socket.io
setupSocket(server);

// Start the server
const PORT = process.env.DEV_PORT || 3005;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
