const User = require('../models/user.model');
const  sendVerificationMail = require('./nodemailer.js');

const resendCode = async(req,res) => {

    const { username, new_verificationsCode } = req.body;

    const user = await User.findOne({username});
    

    if (user) {

        let id = user._id;
        let usermail = user.email;
        let username = user.username;

        try {
            await User.updateOne(       
                {_id:id},   
                { $set: { verificationCode: new_verificationsCode } }    
            )
            await sendVerificationMail(usermail, new_verificationsCode.toString(), username);
        }catch(e) {
            console.log(e)
        }
    }

}

module.exports = {resendCode}