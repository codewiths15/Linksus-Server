// Import the required modules
const express = require("express");
const router = express.Router();

const companyController = require("./../Company/controllers/companyController");
router.post("/company", companyController.post);

module.exports = router;
