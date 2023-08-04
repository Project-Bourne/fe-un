import { io } from "socket.io-client";

const socketio = io("http://192.168.88.161:4000");

export default socketio;
