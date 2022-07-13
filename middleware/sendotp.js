const nodemailer=require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
        port: 465,
        secure: true,
        service: 'Gmail',
    
        auth: {
            user: 'ranjanmaji96@gmail.com',
            pass: 'xkqpknwkgmcpvcts',
        }
});

exports.send = (mailOptions,cb)=>
{
	transporter.sendMail(mailOptions,(err,info)=>{
		if(err)
			cb(err);
		cb(null,info);
	});
}