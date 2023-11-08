const User = require('../models/user.model');

module.exports.retrieveUsers = (req,res) =>{
    User.find()
        .then(items => res.json(items))
        .catch(e => res.status(400).json('Error: '+ e));
}