const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
const cors = require("cors");
const http = require('http');
const socket = require("socket.io");
const Chat = require('./models/chatModel');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const authRoute = require("./routes/authRoutes");
app.use("/userAuth", authRoute);

const userRoute = require("./routes/userRoutes");
app.use("/", userRoute);

const companyRoute = require("./routes/companyRoutes");
app.use("/", companyRoute)

const taskRoute = require("./routes/taskRoutes");
app.use("/", taskRoute)

const chatRoute = require("./routes/chatRoutes")
app.use("/chat", chatRoute)

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/googlesignin', (req, res) => res.render("googleAuth"));

const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI)
    .then(() => { console.log("MongoDB connected"); })
    .catch(err => console.log("MongoDB error: ", err));

const server = http.createServer(app);

const io = new socket.Server(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('joinRoom', ({ username, room }) => {
        socket.join(room);
        console.log(`${username} joined room ${room}`);
        socket.to(room).emit('message', { sender: 'Admin', message: `${username} has joined the chat`, timestamp: new Date().toISOString() });
    });

    socket.on('chatMessage', async ({ room, msg }) => {
        io.to(room).emit('chatMessage', msg);

        // Save message to database
        const newChat = new Chat({
            room: room,
            sender: msg.sender,
            receiver: room, // Assuming room is a unique identifier for a 1-to-1 chat
            message: msg.message,
            timestamp: new Date(msg.timestamp) // Ensure the timestamp is a valid Date object
        });

        try {
            await newChat.save();
            console.log("Message saved to MongoDB");
        } catch (error) {
            console.error("Error saving message to MongoDB", error);
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(3005, () => {
    console.log("Server is running on port 3005");
});
