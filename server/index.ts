import express from 'express';
import socketio from 'socket.io';
import http from 'http';

const PORT : number = 5000; 

const router = require('./router');

const app : express.Application = express();
const server : http.Server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
    console.log("New connection");
    socket.on('disconnect', () => {
        console.log("Disonnected");
    })
});


app.use(router);

server.listen(PORT, () => console.log(`Started on ${PORT}`));