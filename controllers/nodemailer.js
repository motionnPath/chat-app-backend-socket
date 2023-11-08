const nodemailer = require('nodemailer');
require('dotenv').config();


const sendVerificationMail = async(recipient,verificationCode, recipientName) => {


    const my_email = process.env.NODEMAILER_MAIL;
    const my_secret_pass = process.env.NODEMAILER_PASS;// from 2 step verification google sicherheit


    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
    service:'gmail',
    host:"smtp.gmail.com",
    port: 587,
    secure:false,
    auth: {
        user: my_email,
        pass: my_secret_pass,
    },
    tls: {
        rejectUnauthorized: false, // Add this line to trust self-signed certificates
    },
    });

    // Define email options
    const mailOptions = {
        from: {
            name:'ChatApp Team',
            address:my_email
        },
        to: recipient,
        subject: 'Verification Code',
        text: verificationCode,
        html: `<h2>Dear ${recipientName},</h2><br><br>
        <h3> Hier you have your Verification Code ${verificationCode} <br><br>
        Thanks, </h3>
        Your ChatCat Team.`,
    };
  
    // Send the email
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
        console.error('Error sending email:', error);
        } else {
        console.log('Email sent:', info.response);
        }
    });
    
    
}

module.exports = sendVerificationMail
