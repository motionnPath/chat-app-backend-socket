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
    origin:"https://chat-app-frontend-yevs.onrender.com/"
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

    console.log('soket ir ===', socket.id)

});

server.listen(process.env.PORT, ()=>{
  console.log('Server is running on port: ',process.env.PORT)
})


