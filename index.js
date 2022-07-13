const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const stripeRoute = require('./routes/stripe');
const otpRoute = require('./routes/sendOtp');



dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('DB Connection is Successfull!'))
.catch((error) => {
    console.log(error);
});
app.use(express.json());

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/products', productRoute);
app.use('/api/carts', cartRoute);
app.use('/api/orders', orderRoute);
app.use('/api/checkout', stripeRoute);
app.use('/api/mail', otpRoute);

app.listen(process.env.PORT || 8000, () => {
    console.log("Server Is Running");
});