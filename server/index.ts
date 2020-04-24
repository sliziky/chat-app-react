import express from "express";
import socketio from "socket.io";
import http from "http";
import IError from "./models/IError";
import IUser from "./models/IUser";

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users.ts");

const PORT: number = 5000;

const router = require("./router");

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const newUser : IUser = {id : socket.id, name, room};
    const { error, user } = addUser(newUser);
   console.log("USER", user);
    if (error) {
      return callback(error);
    }

    socket.emit("message", { user: "admin", text: "Text1" });


    callback();
  });
  socket.on("sendMessage", (message, callback) => {
    const user: IUser = getUser(socket.id);
    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });
  socket.on("disconnect", () => {
    console.log("Disonnected");
  });
});
app.use(router);

server.listen(PORT, () => console.log(`Started on ${PORT}`));
