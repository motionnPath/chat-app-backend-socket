const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const loginAuth = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find the user by email
      const user = await User.findOne({ email });
  
      // Check if the user exists and if the password is correct
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      if(!user.verified){
        console.log(user.username  ,' is not verified')
        return res.status(401).json({ message: 'Please verify your Account' });
      }
  
  
      const accessToken = jwt.sign(
        {"userid": user._id},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '30s'}
      );
      const refreshToken = jwt.sign(
        {"userid": user._id},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: '1d'}
      );
  
      // Saving refreshToken with current user 
      user.refreshToken = refreshToken;
      const result = await user.save();
      
  
      res.cookie('jwt',refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000}); // ms
      res.json({username: user.username ,accessToken});
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  module.exports = {loginAuth}