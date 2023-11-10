const express = require('express');
const http = require('http');
const {Server} = require('socket.io');
const axios = require('axios');
const cors = require('cors')
const router = express.Router();



const server_url = process.env.SERVER_URL;
 

// Create an Express app and a Node.js HTTP server
const app = express();
const server = http.createServer(app);

// Create a Socket.IO instance attached to the server
const io = new Server(server,{
  cors:{
    origin:"https://chat-app-frontend-yevs.onrender.com"
  }
});

app.use(cors())
app.use(router)

router.get("/", (req, res) => {
  res.send({ response: "Server is up and running." }).status(200);
});


let private_room
let onlineUsers = []; // Store user information and socket connections

io.on('connection', (socket) => {

  console.log("socket id =",socket.id)
  
  socket.on("join-room",({room})=> {
    private_room = room
  })

  // asign userName to its soketID
  socket.on('startChat', ({username}) => {
      // if u have no such username assign a soketId to that unique username
    if (!onlineUsers.some(user => user.username === username)) {
      onlineUsers.push(({
        username,
        socketId: socket.id,
      }))
    }else {
      // if u do have such a username pls update its socketId 
      const index = onlineUsers.findIndex(user => user.username === username);
      onlineUsers[index].socketId = socket.id;
      
    }
    
    console.log("OnlineUsers",onlineUsers)
  });

  // Handle private messages
  socket.on('privateMessage', async (data) => {
    const { from,to, message,room_1,room_2} = data;

    socket.join(room_1)
    socket.join(room_2)
    //console.log("data = ",data)
    let reciptient = onlineUsers.find(u => u.username === to.toString())
    let sender = onlineUsers.find(u => u.username === from.toString())
   
   
    // if recipient is connected !
    if(reciptient) {
      io.to([room_1,room_2])
        .to([reciptient.socketId,sender.socketId])
        .emit('getPrivateMessage',{
          message,
          from:sender.username,
          time: (new Date()), 
          room:private_room
        })
    }else { // if not just send it to the sender and deliver the msg to mongoDB in line 85
      
      io.to([sender.socketId])
        .emit('getPrivateMessage',{
          message,
          from:sender.username,
          time: (new Date()), 
          room:private_room
        })
    }
    
    
    // saving msg data to database
    if(data){
      axios.post(`${server_url}/conversations/new-conversation`,{
        conversation: {
          message,
          from:sender.username,
          time: (new Date()),
          room:private_room
        }
      }).then( d => {
        //console.log('new conversation added',d)
      }).catch(e => console.error(' Error creating soket conversation',e))
    }
    
  });

  socket.on('disconnect', () => {
    
   
  });
});

server.listen(process.env.PORT, ()=>{
  console.log('Server is running on port: ',process.env.PORT)
})


