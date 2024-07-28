const { getAllUser, getUserByEmail, saveUser, checkAdmin } = require('../../controllers/userController');
const { verifyAdmin } = require('../../middlewares/verifyAdmin');
const { verifyToken } = require('../../middlewares/verifyToken');


const router = require('express').Router();

router.get('/',verifyToken, verifyAdmin, getAllUser);
router.get('/1/:email', getUserByEmail);
router.post('/', saveUser);
router.get('/1/admin/:email', verifyToken, verifyAdmin, checkAdmin);



module.exports = router;