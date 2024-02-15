var nodemailer = require('nodemailer');
require('dotenv').config();
async function sendEmail(params,callback){
    console.log(process.env.SENDER);
    var transport = nodemailer.createTransport({
        service:process.env.SERVICE,
        secure:false,
        auth: {
            user:process.env.SENDER,
            pass: process.env.PASSWORD
        }
        // host: 'smtp.ethereal.email',
        // port: 587,
        // auth: {
        //     user: 'benton.simonis96@ethereal.email',
        //     pass: 'cmvvT7ZfncyDYQJ3T4'
        // }
    });

    var mailOptions = {
        from : process.env.SENDER,
        to:params.email,
        subject:params.subject,
        html:params.body

    }

    transport.sendMail(mailOptions,function(error,info){
        if(error){
            console.log(`error in sending mail`);
           return callback(error+`error in sendmail`);
        }
        else{
            console.log(info);
            return callback(null,info.response)
        }
    });


}

module.exports={
    sendEmail
};