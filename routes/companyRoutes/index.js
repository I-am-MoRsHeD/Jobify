const { getAllCompany, saveCompany, getAllCompanyByPagination } = require('../../controllers/companyController');


const router = require('express').Router();


// routes
router.get('/', getAllCompany);
router.get('/1/pag', getAllCompanyByPagination);
router.post('/', saveCompany);

module.exports = router;