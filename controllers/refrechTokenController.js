const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    //console.log("recieved cookies on server refrechtoken", cookies)
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken }).exec(); //console.log("found user =", foundUser)
    if (!foundUser) return res.sendStatus(403); //Forbidden 
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser._id.toString() !== decoded.userid) return res.sendStatus(403);
            
            const accessToken = jwt.sign(
                {
                    "userid": decoded.userid,
                
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            );
            res.json({ user:foundUser.username,accessToken })
        }
    );
}

module.exports = { handleRefreshToken }