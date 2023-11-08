const Conversation = require('../models/conversation.model');

module.exports.retrieveConversations = (req,res) =>{

    let room_1 = req.query.room_1.toString();
    let room_2 = req.query.room_2.toString();
    
    Conversation.find()
        .then(items => {

            let specificConversationList = (items.filter( i => i.conversation.room === room_1 || i.conversation.room === room_2)).map( i => i.conversation)
            if(specificConversationList){
                res.json(specificConversationList)
            }else res.send('no conversation found !')
        })
        .catch(e => res.status(400).json('Error: '+ e));
}