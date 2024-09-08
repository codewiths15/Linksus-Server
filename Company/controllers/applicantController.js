const ApplicantDetails = require('../models/applicantModel');

// Create a new applicant
exports.createApplicant = async (req, res) => {
  const { name, email, profileLink, appliedOn, score, category, profileImageLink } = req.body;

  try {
    const newApplicant = new ApplicantDetails({
      name,
      email,
      profileLink,
      appliedOn,
      score,
      category,
      profileImageLink,
    });

    const savedApplicant = await newApplicant.save();
    res.status(201).json(savedApplicant);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update applicant by email
exports.updateApplicantByEmail = async (req, res) => {
  const { email } = req.params;
  const updates = req.body;

  try {
    const updatedApplicant = await ApplicantDetails.findOneAndUpdate({ email }, updates, { new: true });

    if (!updatedApplicant) {
      return res.status(404).json({ message: 'Applicant not found' });
    }

    res.status(200).json(updatedApplicant);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete applicant by email
exports.deleteApplicantByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const deletedApplicant = await ApplicantDetails.findOneAndDelete({ email });

    if (!deletedApplicant) {
      return res.status(404).json({ message: 'Applicant not found' });
    }

    res.status(200).json({ message: 'Applicant deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get applicant by email
exports.getApplicantByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const applicant = await ApplicantDetails.findOne({ email });

    if (!applicant) {
      return res.status(404).json({ message: 'Applicant not found' });
    }

    res.status(200).json(applicant);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all applicants
exports.getAllApplicants = async (req, res) => {
  try {
    const applicants = await ApplicantDetails.find();
    res.status(200).json(applicants);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
