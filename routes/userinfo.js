const Userinfo = require('../models/Userinfo');
const router = require('express').Router();
const upload = require('../controllers/multer');
const cloudinary = require('../controllers/cloudnary');
const path = require('path');


//Create User Info
router.post('/', async (req, res) => {
    

    try {
        const newUser = new Userinfo(req.body)
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }
})
//Update User info
router.put('/:id', async (req, res) => { 

    try{
        const updateUser = await Userinfo.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },{ new:true });
        res.status(200).json(updateUser);
    } catch (err) {res.status(500).json(err);
    
    }
});
//img Upload
router.post('/doc', upload.single('img'), async (req, res) => {
    const result = await cloudinary.uploader.upload(req.file.path,); //{ folder: 'test'}
    res.send(result)
})


router.delete('/del', async (req, res) => {
   try {
        const { public_id } = req.body;
        if(!public_id) return res.status(400).json({msg : ' No Image Selectd'})

         cloudinary.uploader.destroy(public_id, async(err, result) => {
            if(err) throw err;

            res.json({msg: "Deleted Image"})
        })


   } catch (err) {
        return res.status(500).json({mes: err.message})
   }
})

//img Upload





// router.post('/upload', upload.single('image'), async (req, res) => {
//     try {
//         const result = await cloudinary.uploader.upload(req.file.path);
//         // Create instance of User
//         let user = new Userinfo({
//             gstdoc: req.body.gstdoc,
//             avater: result.secure_url,
//             cloudinary_id: result.public_id,
//         })
//         await user.save();

//         res.json(user);
//     } catch (err) {
//         console.log(err)
//     }
// })

router.get('/upload/:id', async (req, res) => {
    try {
        let user = await Userinfo.find();
        res.json(user);
    } catch (err) {
        console.log(err
            )
    }
})


router.delete('/upload/:id', async (req, res) => {
    try {
        //Find user by id 
        let user  = await Userinfo.findById(req.params.id)
        //delete image from cloudinary 
        await cloudinary.uploader.destroy(user.cloudinary_id);
        //delete user from db
        await user.remove();
        res.json(user);
    } catch (err) {
        console.log(err)
    }
})

router.put('/upload/:id', upload.single('image'), async (req, res) => {
    try {
        let user = await Userinfo.findById(req.params.id);

        await cloudinary.uploader.destroy(user.cloudinary_id);

        const result = await cloudinary.uploader.upload(req.file.path);
        const data = {
            gstdoc: req.body.gstdoc || user.gstdoc,
            avater: result.secure_url || user.avater,
            cloudinary_id: result.public_id || user.cloudinary_id,
        };
        user = await Userinfo.findByIdAndUpdate(req.params.id, data, { new: true });
        res.json(user)
    } catch (err) {
        console.log(err)
    }
})









module.exports = router