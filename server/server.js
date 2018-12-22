const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage , generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname , '../public');
const app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection' , (socket) => {
    console.log('New User Connected');

    socket.emit('newMessage',generateMessage("Admin!","Welcome To My Node-Chat"));

    socket.broadcast.emit('newMessage' ,generateMessage("Admin!","New User Joined"));

    socket.on('disconnect' , () => {
        console.log('User Disconnected');
    });

    socket.on('createMessage' , (message , callback) => {
        console.log('MessageCreated' , message);
        io.emit('newMessage' ,generateMessage(message.from , message.text));
        callback();
    });

    socket.on('createMessageLocation' , (coords) => {
        io.emit('newLocationMessage' , generateLocationMessage('Admin!' , coords.latitude, coords.longitude));
    });
});

const port = process.env.PORT || 3000 ;
server.listen(port , () => {
    console.log(`Listening on port ${port}...`)
});