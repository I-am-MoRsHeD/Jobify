const { getAllCompany, saveCompany, getAllCompanyByPagination, deleteCompany } = require('../../controllers/companyController');
const { verifyAdmin } = require('../../middlewares/verifyAdmin');
const { verifyToken } = require('../../middlewares/verifyToken');


const router = require('express').Router();


// routes
router.get('/', verifyToken, verifyAdmin, getAllCompany);
router.get('/1/pag', verifyToken, verifyAdmin, getAllCompanyByPagination);
router.post('/', verifyToken, verifyAdmin, saveCompany);
router.delete('/:id', verifyToken, verifyAdmin, deleteCompany);

module.exports = router;