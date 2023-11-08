const Conversation = require('../models/conversation.model');

module.exports.newConversation = async (req,res) => {

    const {conversation} = req.body;

    console.log("conversation = ",conversation)

    const newConversation = new Conversation({conversation:conversation});

    await newConversation.save().then(res => {
        console.log("new conversation has been added!")
    }).catch( e => console.error('Error Creating new conversation on MongoDb',e))
}