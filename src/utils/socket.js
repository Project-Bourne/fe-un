import { io } from "socket.io-client";

const socketio = io("http://localhost:3080", {
  autoConnect: false,
});

export default socketio;
