import React, { useEffect, useState } from "react";
import { AppLayout } from "../layout/index";
import { motion } from "framer-motion";
import "../styles/global.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store, persistor } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import socketio from "../utils/socket";
import SocketService from "../socket/chat.socket";
import {
  setRecentChats,
  updateUserMsgs,
} from "../redux/reducers/chat/chatReducer";

function App({ Component, pageProps, ...appProps }) {
  return (
    <Provider store={store}>
      <AppWrapper Component={Component} pageProps={pageProps} {...appProps} />
    </Provider>
  );
}

// AppWrapper component created to enable the use of redux tools

const AppWrapper = ({ Component, pageProps, ...appProps }) => {
  // State to hold the socket instance
  const [socket, setSocket] = useState<any | null>(null);
  const [newArr, setNewArr] = useState<any[]>([]);
  const [newMessages, setNewMessages] = useState();
  const allRecentChats = useSelector(
    (state: any) => state?.chats?.allRecentChats,
  );
  const dispatch = useDispatch();

  const pageAnimationVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.5 } },
  };

  // initiate socket connection
  useEffect(() => {
    // Connect the socket instance
    socketio.connect();
    _constructor();

    return () => {
      socketio.disconnect();
    };
  }, []);

  useEffect(() => {
    // confirm socket connection
    socketio.on("connected-id", (res) => {
      console.log("res", res);
    });
    // get all new messages from socket
    socketio.on("bot-new-msgs", (msgs) => {
      console.log("new msgs", msgs);
      setNewMessages(msgs);
    });

    // get and log all connection error
    socketio.on("error", (err) => {
      console.log("socket error", err);
    });
  }, [socketio]);

  useEffect(() => {
    _sort_msgs(newMessages);
  }, [newMessages]);

  // initial user update using authenticated UUID on app mount
  const _constructor = async () => {
    const useSocket = SocketService;
    // get UUID from localStorage upon user authentication
    useSocket.updateData({ uuid: "ff10f31d-2b0d-48b0-a5fa-84cbd56dac28" });
  };

  // sort all `new messages` using `uuid` coming from the socket and updates `allRecentChats` array against user data
  const _sort_msgs = async (data: any) => {
    if (data?.messages?.length > 0) {
      for (let i = 0; i < data.messages.length; i++) {
        const userId = data.messages[i].sender;
        const firstName = "Henry"; //data.messages[i]
        const lastName = "Okafor"; //data.messages[i]
        const img = "../assets/images/avatar.jpg"; //data.messages[i]
        const newMessages = data.messages[i];

        if (allRecentChats?.length > 0) {
          const isExists = allRecentChats.findIndex(
            (user: any) => user.userId === userId,
          );
          if (isExists) {
            dispatch(updateUserMsgs({ userId, newMessages }));
          } else {
            dispatch(
              updateUserMsgs({ userId, firstName, lastName, img, newMessages }),
            );
          }
        } else {
          dispatch(
            updateUserMsgs({ userId, firstName, lastName, img, newMessages }),
          );
          // console.log('first time chats', {userId, firstName, lastName, img, newMessages})
        }
      }
    } else {
      return;
    }
  };

  const isLayoutNeeded = appProps.router.pathname.includes("/auth");

  const LayoutWrapper = !isLayoutNeeded ? AppLayout : React.Fragment;

  return (
    <PersistGate loading="null" persistor={persistor}>
      <LayoutWrapper>
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
      </LayoutWrapper>
    </PersistGate>
  );
};

export default App;
