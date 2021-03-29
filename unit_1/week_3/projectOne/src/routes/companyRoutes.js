const express = require('express');

const companyController = require('../controllers/companyController');

const router = express.Router();

router.param('id', companyController.checkID);

router
  .route('/:id')
  .get(companyController.getCompany)
  .patch(companyController.updateCompany)
  .delete(companyController.deleteCompany);

router
  .route('/')
  .get(companyController.getAllCompanies)
  .post(companyController.createCompany);

module.exports = router;
