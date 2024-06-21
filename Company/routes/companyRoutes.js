const express = require('express');
const companyController = require('../controllers/companyController');

const router = express.Router();

router.post('/register', companyController.registerCompany);
router.get('/', companyController.getAllCompanies);
router.get('/:companyId', companyController.getCompanyById);
router.put('/:companyId', companyController.updateCompanyById);
router.delete('/:companyId', companyController.deleteCompanyById);

module.exports = router;
