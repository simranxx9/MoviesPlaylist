const catchAsync = require('../utils/catchAsync');
// const AppError = require('../utils/appError');
const config = require('../config/config');
const mail = require('../utils/mailHandler');
// const Razorpay = require('razorpay')
const { products } = require('../src/data');

// const key_id  = config.key_id;
// const key_secret  = config.key_secret;
// var instance = new Razorpay({  key_id ,  key_secret})

exports.getAllProducts = catchAsync(async (req, res, next) => {  
    res.status(200).send(products);
});

// exports.placeOrder = catchAsync(async (req, res, next) => {  
//     const { productId } = req.body;
//     console.log(productId);
//     const product = products.find(product => product.id == productId);
//     instance.orders.create(
//         {
//             amount : product.price * 100, 
//             currency : product.currency , 
//             receipt : 'receipt#123', 
//             notes : {
//                 desc : product.description
//             }
//         },(error,order) => {
//             if(error)
//                 return res.status(500).json(error);
                
//             return res.status(200).json(order);
//         })
// });

// exports.verifyRazorpaySignature = catchAsync(async (req, res, next) => {  
//     console.log(JSON.stringify(req.body));
//     const crypto = require('crypto');
//     const hash = crypto.createHmac('SHA256', "shekhar")
//         .update(JSON.stringify(req.body))
//         .digest('hex');
//     console.log(hash);
//     console.log(req.headers["x-razorpay-signature"]);
//     if(hash === req.headers["x-razorpay-signature"]){
//         //save payment information in database for future reference
//     }
//     else{
//         //declined the payment
//     }
//     res.status(200);
// });



  
