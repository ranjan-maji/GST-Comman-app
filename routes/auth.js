const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');


//REGISTER
router.post('/register', async (req, res) => {
    const newUser = new User({
       username: req.body.username,
       email: req.body.email,
       password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(), 
       ph: req.body.ph,
       dob: req.body.dob
       
    });

    try{
    const saveUser = await newUser.save();
    res.status(201).json(saveUser);
    }catch(err) {
        res.status(500).json(err);
     }
});


//LOGIN

router.post('/login', async (req, res) => {
     try {
        
        const user = await User.findOne({email: req.body.email });
        !user && res.status(401).json('Wrong Credentials!')

        const hashPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);

        const OriginalPassword = hashPassword.toString(CryptoJS.enc.Utf8);

        OriginalPassword !== req.body.password && res.status(401).json('Wrong Credentials!');


        const accessToken = jwt.sign(           //Using JWt accesstoken 
            {
            id:user._id,
            isAdmin: user.isAdmin,
           },
           process.env.JWT_SEC,{expiresIn: '3d'}
        );

        const { password, ...others } = user._doc;      //._doc -> Use only for the MongoDB...if Your not use MongoDb Error 

        res.status(200).json({...others, accessToken});

     } catch (err) {
        res.status(500).json(err);
     }
     

});

module.exports = router
