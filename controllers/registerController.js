const bcrypt = require('bcrypt');
const  sendVerificationMail = require('./nodemailer.js');
const User = require('../models/user.model');


const register = async (req, res) => {
    try {
      const { username, email, verificationCode, password } = req.body;
  
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Hash the password before saving it to the database
      const hashedPassword = await bcrypt.hash(password, 10);
      const verified = false;
      // Create a new user
      const newUser = new User({ username,email, verificationCode, verified, password: hashedPassword,refreshToken:"" });
      await newUser.save();
      
      // send verification mail 
      try {
        await sendVerificationMail(email,verificationCode.toString(),username);
      }catch(error){
        console.error(error);
      }

      res.status(201).json({ message: 'User registered successfully' });
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {register}