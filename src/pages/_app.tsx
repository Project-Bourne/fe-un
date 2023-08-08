import React, { useEffect, useState } from "react";
import { AppLayout } from "../layout/index";
import "../styles/global.css";
import { Provider } from "react-redux";
import store from "../redux/store";
import socketio from "../utils/socket";
import SocketClass from "../socket/chat.socket";

function App({ Component, pageProps, ...appProps }) {
  // State to hold the socket instance
  const [socket, setSocket] = useState<any | null>(null);

  useEffect(() => {
    // Connect the socket instance
    socketio.connect();
    _constructor();


    return () => {
      socketio.disconnect();
    }
  }, []);

  useEffect(() => {
    socketio.on("connected-id", (res) => {
      console.log("res", res);
    });

    socketio.on("bot-new-msgs", (msgs) => {
      console.log("msgs", msgs);
    });

    socketio.on("error", (err) => {
      console.log('socket error', err)
    });
    
  }, [socketio]);

  const _constructor = async () => {
    const useSocket = SocketClass;
    // get UUID from localStorage upon user authentication 
    useSocket.updateData({ uuid: "ff10f31d-2b0d-48b0-a5fa-84cbd56dac28" });
  };

  const isLayoutNeeded = appProps.router.pathname.includes("/auth");

  const LayoutWrapper = !isLayoutNeeded ? AppLayout : React.Fragment;

  return (
    <Provider store={store}>
      <LayoutWrapper>
        <Component {...pageProps} socket={socket} />
      </LayoutWrapper>
    </Provider>
  );
}

export default App;
