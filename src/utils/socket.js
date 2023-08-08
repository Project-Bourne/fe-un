import { io } from "socket.io-client";

const socketio = io("http://localhost:4000", {
    autoConnect: false
});

export default socketio;
