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

const socketio = io(
  `http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_COLLAB_API_PORT}/`,
  {
    autoConnect: false,
    extraHeaders: requestHeader,
    // path: "/86"
  },
);

export default socketio;
