// Import the required modules
const express = require("express");
const router = express.Router();

const companyInfoController = require("../controllers/companyInfoController");
router.post("/company", companyInfoController.post);

module.exports = router;
