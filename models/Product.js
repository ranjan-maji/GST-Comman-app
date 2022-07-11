const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema(
    {
        
    name: { type: String,},
    desc: { type: String, },
    img: { type: String,  },
   // categories: { type: Array },
   pagename: { type: String, },
    
    
   },
    { timestamps: true }
);


module.exports = mongoose.model('Product', ProductSchema);