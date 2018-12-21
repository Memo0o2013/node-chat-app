const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname , '../public');
const app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection' , (socket) => {
    console.log('New User Connected');

    socket.emit('newMessage' , {
        from: 'Moha',
        text: 'lol Works again',
        createdAt: '7:03'
    });

    socket.on('disconnect' , () => {
        console.log('User Disconnected');
    });

    socket.on('createMessage' , (message) => {
        console.log('MessageCreated' , message)
    });
});

const port = process.env.PORT || 3000 ;
server.listen(port , () => {
    console.log(`Listening on port ${port}...`)
});