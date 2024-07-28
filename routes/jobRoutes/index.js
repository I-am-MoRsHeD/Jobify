const { saveJobs, deleteJob, updateJob, getSingleJob, getJobsByCompany, getAllJobs, getJobsByPagination } = require('../../controllers/jobsController');
const { verifyAdmin } = require('../../middlewares/verifyAdmin');
const { verifyToken } = require('../../middlewares/verifyToken');


const router = require('express').Router();

router.get('/', verifyToken, verifyAdmin, getAllJobs);
router.get('/2',verifyToken, verifyAdmin, getJobsByCompany);
router.get('/:id',verifyToken, verifyAdmin, getSingleJob);
router.get('/1/pag',verifyToken, verifyAdmin, getJobsByPagination);
router.post('/',verifyToken, verifyAdmin, saveJobs);
router.patch('/:id',verifyToken, verifyAdmin, updateJob);
router.delete('/:id',verifyToken, verifyAdmin, deleteJob);


module.exports = router;
