//Database schema for OTP
var ttl = require('mongoose-ttl');
const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique:true
    },
    otp: {
        type: String,
        required: true
    },


}, { timestamps: true });
otpSchema.plugin(ttl, { ttl: "5m", interval: 1500 })

module.exports = mongoose.model("OTP", otpSchema);