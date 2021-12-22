const router = require("express").Router();

const authContoller = require('../../controllers/authController');
const productContoller = require('../../controllers/productController');

//Check for authentication
// router.use(authContoller.protect);

//Common routes for all users
router.get('/', productContoller.getAllProducts);
// router.post('/place-order', productContoller.placeOrder);
// router.post('/verify-razorpay-signature', productContoller.verifyRazorpaySignature);
module.exports = router;
