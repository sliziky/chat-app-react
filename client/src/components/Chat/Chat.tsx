import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import "./Chat.css";

let socket: SocketIOClient.Socket;

const Chat = ({ location }: any) => {
  const [name, setName] = useState<string | string[]>("");
  const [room, setRoom] = useState<string | string[]>("");
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");

  const ENDPOINT = "localhost:5000";
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io.connect(ENDPOINT);

    if (name !== null && name !== undefined) {
      setName(name);
    }
    if (room !== null && room !== undefined) {
      setRoom(room);
    }

    socket.emit("join", { name, room }, () => {});

    return () => {
      socket.emit("disconnect");
      //socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message: string) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = (event: any) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => { setMessage(""); });
    }
  };
  console.log(message, messages);
  return (
    <div className="outerContainer">
      <div className="container">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
        />
      </div>
    </div>
  );
};

export default Chat;
