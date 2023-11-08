const User = require('../models/user.model');

const verifyCode = async(req,res) => {



    const { username, code} = req.body
 
    const user = await User.findOne({username})

    try{
        if(user.verificationCode === code){
            let id = user._id;
            await User.updateOne(
                {_id:id},
                { $set: { verified: true } }
            )
            console.log(username, " is been verified !")
        }

    }catch(err){
        console.error('updating verified failed',err)
    }

    if(user) {
        
        res.json({verificationCode: user.verificationCode})
    }

}

module.exports = {verifyCode}