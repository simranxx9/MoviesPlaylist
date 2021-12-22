const router = require("express").Router();

const authContoller = require('../../controllers/authController');

//Check for authentication

//Common routes for all users
router.post('/verify', authContoller.verify);

module.exports = router;
