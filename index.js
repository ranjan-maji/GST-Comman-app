const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const passport = require('passport');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const stripeRoute = require('./routes/stripe');
const otpRoute = require('./routes/sendOtp');
const otpMRoute = require('./routes/sendmOtp');
const userinfoRoute = require('./routes/userinfo');
const allusersRoute = require('./routes/users');

dotenv.config();


mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('DB Connection is Successfull!'))
.catch((error) => {
    console.log(error);
});
app.use(express.json());
app.use(passport.initialize());

require('./middleware/passport')(passport);


app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/products', productRoute);
app.use('/api/carts', cartRoute);
app.use('/api/orders', orderRoute);
app.use('/api/checkout', stripeRoute);
app.use('/api/mail', otpRoute);
app.use('/api/mob', otpMRoute);
app.use('/api/userinfo', userinfoRoute);
app.use('/api/allusers', allusersRoute);


app.listen(process.env.PORT || 8000, () => {
    console.log("Server Is Running");
});