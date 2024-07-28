const { getAllCompany, saveCompany, getAllCompanyByPagination, deleteCompany } = require('../../controllers/companyController');


const router = require('express').Router();


// routes
router.get('/', getAllCompany);
router.get('/1/pag', getAllCompanyByPagination);
router.post('/', saveCompany);
router.delete('/:id', deleteCompany);

module.exports = router;