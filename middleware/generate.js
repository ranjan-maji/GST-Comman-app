const otpGenerator = require('otp-generator');

exports.generateOtp = ()=>
{
	return otpGenerator.generate(6,{ digits: true,lowerCaseAlphabets:false,upperCaseAlphabets:false, specialChars: false });
}


