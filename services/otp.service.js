
const otpGenerator = require('otp-generator');
const crypto =  require('crypto');
const emailServices = require('../services/emailer.service');

const key = process.env.KEY;
async function sendOTP(params,callback){
    console.log(key);
    const otp = otpGenerator.generate(4,{
        digits:4,
        upperCaseAlphabets:false,
        specialChars:false,
        lowerCaseAlphabets:false
    });
    const ttl = 5*60*1000;
    const expires = Date.now()+ttl;
    const data = `${params.email}.${otp}.${expires}`;
    const hash = crypto.createHmac("sha256",key).update(data).digest("hex");
    const fullHash = `${hash}.${expires}`;

    var otpMessage = `Dear Customer, <h3> ${otp} </h3> is the one time password  for your login`;
    var model = {
        email:params.email,
        subject:"Registeration OTP",
        body:otpMessage
    }
    emailServices.sendEmail(model,(error,result)=>{
        if(error){
            return callback(error);
        }
        else{
            return callback(null,fullHash);
        }
    })
}


async function verifyOTP(params, callback){
    let[hashValue,expires]=params.hash.split('.');
    let now = Date.now();
    if(now> parseInt(expires)) return callback("OTP is Expired");
    let data = `${params.email}.${params.otp}.${expires}`;
    let newCalculatedHash = crypto.createHmac("sha256",key).update(data).digest;
     return newCalculatedHash==hashValue? callback(null,"Success"):callback("Invalid OTP");
}

module.exports = {
    sendOTP,verifyOTP
}