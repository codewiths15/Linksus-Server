// routes/chatRoutes.js
const express = require('express');
const Chat = require('../Freelancer/models/chatModel');

const router = express.Router();

router.get('/history/:room', async (req, res) => {
    const { room } = req.params;
    try {
        const chats = await Chat.find({ room }).sort({ timestamp: 1 });
        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
