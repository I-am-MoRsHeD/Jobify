const authController = require("../../controllers/authController");
const logout = require("../../controllers/logoutController");


const router = require("express").Router();

router.post('/jwt', authController);
router.get('/logout', logout);


module.exports = router;
