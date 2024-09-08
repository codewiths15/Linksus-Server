const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const applicantDetailsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profileLink: {
    type: String,
    required: true,
  },
  appliedOn: {
    type: Date,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ['Applied', 'Shortlisted', 'Selected'],
    required: true,
  },
  profileImageLink: {
    type: String,
    required: true,
  },
},{timestamps: true});

const ApplicantDetails = mongoose.model('ApplicantDetails', applicantDetailsSchema);

module.exports = ApplicantDetails;
