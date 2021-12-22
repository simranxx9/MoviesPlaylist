const router = require("express").Router();

const authContoller = require('../../controllers/authController');

//Check for authentication
router.use(authContoller.protect);

//Common routes for all users
router.get('', authContoller.detail);
router.put('/update-profile', authContoller.updateProfile);

module.exports = router;
