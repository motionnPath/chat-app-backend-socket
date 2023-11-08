const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type:String, 
        unique:true
    },
    email: {
        type:String, 
        unique:true
    },
    verificationCode: {
        type:Number, 
        unique:true
    },
    verified:Boolean,
    password: String,
    refreshToken: String,
},{
    timestamps: true,
})

const User = mongoose.model('User', userSchema);

module.exports = User; 