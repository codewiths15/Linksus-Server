// socket.js
const socket = require("socket.io");
const Chat = require('./../Freelancer/models/chatModel');

const setupSocket = (server) => {
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
            socket.to(room).emit('message', {
                sender: 'Admin',
                message: `${username} has joined the chat`,
                timestamp: new Date().toISOString()
            });
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

    return io;
};

module.exports = setupSocket;
