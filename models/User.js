const mongoose = require('mongoose')

//const { roles } = require('../controllers/defineUser');

const UserSchema = new mongoose.Schema(
    {
    username: { type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    ph: { type: Number},
    dob: { type: String},
    role: {
        type: String,
        enum: ['superadmin', 'admin', 'client'],
        default: 'client'
    }
    // isAdmin: {
    //     type: Boolean,
    //     default: false,
    //          },
   },
    { timestamps: true }
);


module.exports = mongoose.model('User', UserSchema)