import { io } from "socket.io-client";

const socketio = io("http://192.81.213.226:86/", {
  autoConnect: false,
  // path: "/86"
});

export default socketio;
