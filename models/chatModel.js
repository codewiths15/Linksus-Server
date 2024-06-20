// models/chatModel.js
const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  room: {
    type: String,
    required: true,
    trim: true
  },
  sender: {
    type: String,
    required: true,
    trim: true
  },
  receiver: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
