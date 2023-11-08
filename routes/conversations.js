const router = require('express').Router();
const retrieveConversations = require('../controllers/retrieveConversations.js')
const newConversation = require('../controllers/newConversation.js')

require('dotenv').config();


//retrieve users
router.get('/',retrieveConversations.retrieveConversations);
// Register a new user
router.post('/new-conversation', newConversation.newConversation);

module.exports = router;