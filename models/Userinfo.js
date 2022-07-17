const mongoose = require('mongoose')

const UserinfoSchema = new mongoose.Schema(
    {
    name: { type: String},
    email: { type: String},
    add1: { type: String},
    add2: { type: String},
    city: { type: String},
    state: { type: String},
    phno: { type: String},    
    fname: { type: String},
    lname: { tyep : String},
    dob: { type: String},
    mailid: { type: String},
    phone: { type: String},
    gstno: { type: String},
    panno: { type: String},
    address: { type: String},
    gstdoc: { type: String},
    avater: { type: String},
    cloudinary_id: { type: String}
    // pandoc: { type: String},
    // adddoc: { type: String}

    
   },
    { timestamps: true }
);


module.exports = mongoose.model('Userinfo', UserinfoSchema);