const mongoose = require('mongoose');

// Define the schema for the User model
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    required: true,
    trim: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
    trim: true,
  },
  language: {
    type: [String],
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  aboutme: {
    type: String,
    required: true,
    trim: true,
    maxlength: 180 * 6 // Approximate limit of 180 words
  },
  currentTask: {
    type: String,
    required: true,
    trim: true,
  },
  experience: [{
    role: {
      type: String,
      required: true,
      trim: true
    },
    company: {
      type: String,
      required: true,
      trim: true
    },
    place: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100 * 6 // Approximate limit of 100 words
    }
  }],
  skills: [{
    type: String,
    required: true,
    trim: true,
    lowercase: true
  }],
  addDetails: [{
    tag: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    value: {
      type: mongoose.Schema.Types.Mixed, // Can be a string or an array of strings
      required: true
    }
  }],
  socialLinks: [{
    platform: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    link: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    }
  }],
  education: [{
    level: {
      type: String,
      required: true,
      trim: true
    },
    institution: {
      type: String,
      required: true,
      trim: true
    },
    year: {
      type: Number,
      required: true
    }
  }],
  portfolios: [{
    title: {
      type: String,
      required: true,
      trim: true
    },
    link: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    }
  }],
  resume: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  }
}, { timestamps: true });

// Create the User model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
