const mongoose = require('mongoose')

const otpEmail = new mongoose.Schema(
    {
    username: { type: String, required: true, unique: true},
    otp: {type: String}
   },
    { timestamps: true }
);


module.exports = mongoose.model('MailOTp', otpEmail);