const router = require('express').Router();
const sendotp = require('../middleware/sendotp');
const generate = require('../middleware/generate');
const otp = require('../controllers/otp');


router.post('/send',(req,res) => {
    const x=generate.generateOtp();
    const mailOptions={
        from: 'ranjanmai96@gmail.com',
        to: req.body.email,
        subject: 'Email Verification',
        html: 'Your OTP for Email Verification is <b>'+x+'</b>'
    };
    sendotp.send(mailOptions,(err)=>{
        if(err)
            res.send(err);
        else
        {
            otp.save(req.body.email,x,(error)=>{
                if(error)
                    
                res.send('verifyOtp',{email:req.body.email});
            });
        }
    });
});
router.post('/api/send',(req,res)=>{
    const x=generate.generateOtp();
    const mailOptions={
        from: 'ranjanmai96@gmail.com',
        to: req.body.email,
        subject: 'Email Verification',
        html: 'Your OTP for Email Verification is <b>'+x+'</b>'
    };
    sendotp.send(mailOptions,(err)=>{
        if(err)
            res.send(err);
        otp.save(req.body.email,x,(error)=>{
            if(error)
                res.send(error);
            res.end();
        });
    });
});



router.post('/verify',(req,res)=>{
    otp.match(req.body.email,req.body.otp,(err,data)=>{
        if(err)
            res.send(err);
        if(data==undefined)
            res.send("OTP Expired. Kindly try to resend it.");
        else if(data==true)
        {
            otp.remove(req.body.email,(error,)=>{
                if(error)
                    res.send(error);
                else
                    res.send("Success. Verified.");
            })
        }
        else
            res.send("Failure. Kindly check again.");
    })
});


router.post('/api/verify',(req,res)=>{
    otp.match(req.body.email,req.body.otp,(err,data)=>{
        if(err)
            res.send(err);
        if(data==undefined||data==false)
            res.send("Failure");
        else if(data==true)
        {
            otp.remove(req.body.email,(error)=>{
                if(error)
                    res.send(error);
                else
                    res.send("Success");
            })
        }
    })
});


module.exports = router