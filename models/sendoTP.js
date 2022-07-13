const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const otpSchema = Schema({
	email: {type: String},
	code: {type: String},
}, {timestamps: true});

otpSchema.index({createdAt: 1},{expireAfterSeconds: 120});

const otp=mongoose.model("otps",otpSchema);

module.exports=otp;