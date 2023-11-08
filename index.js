const {server} = require('./server.js');
const {socket} = require('./soket.js');

const server_port = process.env.SERVER_PORT;
const socket_port = process.env.SOCKET_PORT;

const main = () => {
    server.listen(server_port, ()=>{
        console.log('Server is running on port: ',server_port)
    })
    socket.listen(socket_port, () => {
        console.log(`Socket is running on port: `,socket_port);
    });
}

main()