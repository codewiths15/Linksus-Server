// index.js
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
const authRoute = require("./routes/authRoutes");
app.use("/userAuth", authRoute);

const userRoute = require("./routes/userRoutes");
app.use("/", userRoute);

const companyRoute = require("./routes/companyRoutes");
app.use("/", companyRoute);

const taskRoute = require("./routes/taskRoutes");
app.use("/", taskRoute);

const chatRoute = require("./routes/chatRoutes");
app.use("/chat", chatRoute);

app.get('/googlesignin', (req, res) => res.render("googleAuth"));

// Connect to MongoDB
connectDB();

// Create HTTP server
const server = http.createServer(app);

// Setup Socket.io
setupSocket(server);

// Start the server
const PORT = process.env.PORT || 3005;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
