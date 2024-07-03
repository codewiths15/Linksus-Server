const express = require('express');
const router = express.Router();
const applicantController = require('../controllers/applicantController');

// Create a new applicant
router.post('/register', applicantController.createApplicant);

// Update applicant by email
router.put('/:email', applicantController.updateApplicantByEmail);

// Delete applicant by email
router.delete('/:email', applicantController.deleteApplicantByEmail);

// Get applicant by email
router.get('/:email', applicantController.getApplicantByEmail);

// Get all applicants
router.get('/', applicantController.getAllApplicants);

module.exports = router;
