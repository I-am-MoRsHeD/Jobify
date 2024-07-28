const { saveJobs, deleteJob, updateJob, getSingleJob, getJobsByCompany, getAllJobs, getJobsByPagination } = require('../../controllers/jobsController');


const router = require('express').Router();

router.get('/', getAllJobs);
router.get('/2', getJobsByCompany);
router.get('/:id', getSingleJob);
router.get('/1/pag', getJobsByPagination);
router.post('/', saveJobs);
router.patch('/:id', updateJob);
router.delete('/:id', deleteJob);


module.exports = router;
