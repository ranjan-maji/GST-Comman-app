const Order = require('../models/Order');
const { 
    verifyToken,
    verifyTokenAndAuthorization, 
    verifyTokenAndAdmin,
 } = require('./verifyToken');

const router = require('express').Router();
 
//CREATE 
router.post('/register', async (req, res) => { //verifyToken
    const newOrder = new Order(req.body)

    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
})

//UPDATE
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
   try {
    const updateOrder = await Order.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body,
        },
        { new: true }
        
       );
       req.status(200).json(updateOrder);
   } catch (err) {
    res.status(500).json(err);
   }

   
});

//DELETE

router.delete('/id', async (req, res) => {  //verifyTokenAndAdmin,
    try {
        await Order.findByIdAndDelete(req.params.id)
        req.status(200).json('Order has been deleted.....')
    } catch (err) {
        req.status(500).json(err)
    }
})

// //GET USER ORDERS  
router.get('/find/:userId', async (req, res) => {  //verifyTokenAndAuthorization
    try {
        const orders = await Order.find({ userID: req.params.id });
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALl ORDERS
router.get('/ord', verifyTokenAndAdmin, async (req, res) => {
    try{
        const orders = await Order.find()
        res.ststus(200).json(orders)
    }catch (err){
        res.status(500).json(err);
    }
});

//GET MONTHLY INCOME
router.get('/income', async (req, res) => {//verifyTokenAndAdmin,
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth()-1))
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try{ 
         const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } }, 
            {
                $project: {
                    month: { $month: '$createdAt' },
                    sales: '$amount',
                },
                
                    $group: {
                        _id: '$month',
                        total: { $sum: '$sales' },
                }, 
             },
         ]);
        res.ststus(200).json(income);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router
