import React, { useEffect, useState } from "react";
import { AppLayout } from "../layout/index";
import { motion } from "framer-motion";
import "../styles/global.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store, persistor } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import NotificationService from "../services/notification.service";
import socketio from "../utils/socket";
import { setUsers } from "../redux/reducers/users/userReducers";
import globalService from "../services";
import SocketService from "../socket/chat.socket";
import {
  setRecentChats,
  setSelectedChat,
} from "../redux/reducers/chat/chatReducer";
import { setNewWorkSpace } from "@/redux/reducers/workspaceReducer";

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
  const userService = new globalService();
  const allRecentChats = useSelector(
    (state: any) => state?.chats?.allRecentChats,
  );
  const dispatch = useDispatch();
  const { activeChat } = useSelector((state: any) => state.chats);
  const pageAnimationVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.5 } },
  };

  // initial user update using authenticated UUID on app mount
  const _constructor = async () => {
    const useSocket = SocketService;
    useSocket.getRecentChats({ uuid: "50bd293d-bd93-4557-bf86-c3bfefbc8917" });
    useSocket.updateData({ uuid: "50bd293d-bd93-4557-bf86-c3bfefbc8917" });
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
    userService
      .getUsers()
      .then((data) => {
        console.log("all users", data);
        dispatch(setUsers(data));
      })
      .catch((error) => {
        NotificationService.error({
          message: "Failed!",
          addedText: "could not fetch users",
        });
        console.error("Error fetching users:", error);
      });
  }, []);

  useEffect(() => {
    // confirm socket connection
    socketio.on("connected-id", (res) => {
      console.log("res", res);
    });

    // get recent chats
    socketio.on("recent-chats", (res) => {
      let data = JSON.parse(res);
      console.log("res", data.data);
      dispatch(setRecentChats(data.data));
    });
    socketio.on("space-created", (res) => {
      let data = JSON.parse(res);
      console.log("space-created", data.data);
      dispatch(setNewWorkSpace(data.data));
    });
    socketio.on("space-joined", (res) => {
      let data = JSON.parse(res);
      console.log(" space-joined", data.data);
      // dispatch(setNewWorkSpace(data.data))
    });
    socketio.on("msg-sent", async (res) => {
      console.log("msg-sent", res);
      // dispatch(setNewWorkSpace(data.data))
      const useSocket = SocketService;
      await useSocket.getSelectedMsg({
        userId: "50bd293d-bd93-4557-bf86-c3bfefbc8917",
        uuid: activeChat?.uuid,
      });
    });
    socketio.on("all-msgs-selected", (res) => {
      let data = JSON.parse(res);
      console.log("setSelectedChat", data);
      dispatch(setSelectedChat(data.data));
    });

    socketio.on("error", (err) => {
      console.log("socket error", err);
    });
  }, [socketio]);

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
