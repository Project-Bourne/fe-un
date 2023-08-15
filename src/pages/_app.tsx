import React, { useEffect, useState } from "react";
import { AppLayout } from "../layout/index";
import { motion } from "framer-motion";
import "../styles/global.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store, persistor } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import socketio from "../utils/socket";
import SocketClass from "../socket/chat.socket";

function App({ Component, pageProps, ...appProps }) {
  // State to hold the socket instance
  const [socket, setSocket] = useState<any | null>(null);
  const pageAnimationVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.5 } },
  };
  useEffect(() => {
    // Connect the socket instance
    socketio.connect();
    _constructor();

    return () => {
      socketio.disconnect();
    };
  }, []);

  useEffect(() => {
    socketio.on("connected-id", (res) => {
      console.log("res", res);
    });

    socketio.on("bot-new-msgs", (msgs) => {
      console.log("new msgs", msgs);
    });

    socketio.on("error", (err) => {
      console.log("socket error", err);
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
      <PersistGate loading="null" persistor={persistor}>
        <motion.div
          key={appProps.router.route} // Ensure proper animation on route change
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={pageAnimationVariants}
        >
          <Component {...pageProps} />
        </motion.div>
        <ToastContainer />
      </PersistGate>
    </Provider>
  );
}

export default App;
