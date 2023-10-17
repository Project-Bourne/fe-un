import { io } from "socket.io-client";
import { Cookies } from "react-cookie";

const cookies = new Cookies();
let access = "";
if (typeof window !== "undefined") {
  access = cookies.get("deep-access");
}

export const requestHeader = {
  "deep-token": access,
};

const socketio = io("http://192.81.213.226:86/", {
  autoConnect: false,
  extraHeaders: requestHeader,
  // path: "/86"
});

export default socketio;
