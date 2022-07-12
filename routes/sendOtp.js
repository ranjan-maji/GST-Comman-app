const MailOTp = require('../models/sendoTP');
const nodemailer = require('nodemailer');

const router = require('express').Router();



var email;

const otp = Math.floor(100000 + Math.random() * 900000);

console.log(otp);

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: 'Gmail',

    auth: {
        user: 'ranjanmaji96@gmail.com',
        pass: 'xkqpknwkgmcpvcts',
    }




});

router.get('/hi', function (req, res) {
    res.send('Hello, Ranjan')
})



router.post('/otps', function (req, res) {
    email = req.body.email;

    // send mail with defined transport object
    var mailOptions = {
        to: req.body.email,
        subject: "Otp for registration is: ",
        html: "<h3>OTP for account verification is </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>" // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.send('otp');
    });
});


module.exports = router