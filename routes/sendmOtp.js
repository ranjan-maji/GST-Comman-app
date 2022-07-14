const router = require('express').Router();
const fast2sms = require('fast-two-sms');






router.post('/sendmessage', (req, res) => {
    console.log(req.body.message)
    console.log(req.body.number)
 
    sendMessage(req.body.message,req.body.number,res)
})
 
function sendMessage(message,number,res) {
    var options = {
      authorization: process.env.API_KEY,
      message:message,
      numbers: [number],
    };
 
    // send this message
 
    fast2sms
      .sendMessage(options)
      .then((response) => {
        res.send("SMS OTP Code Sent Successfully")
      })
      .catch((error) => {
        res.send("Some error taken place")
      });
}

// router.post('/send', async (req, res) => {
//    const response = await fast2sms.sendMessage({ 
//         authorization : process.env.API_KEY, 
//         message: req.body.message,
//         number: [req.body.number ]
//     })
//         res.send(response)
//     fast2sms.sendMessage(option)
//     .then((response) => {
//         console.log(response)
//     })
//     .catch((error) => {
//         console.log(error)
//     })
 
// })


    
module.exports = router