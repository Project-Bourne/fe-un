import React, { useEffect, useState } from "react";
import { AppLayout } from "../layout/index";
import { motion } from "framer-motion";
import "../styles/global.css";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store, persistor } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import socketio from "../utils/socket";
import { setUsers } from "../redux/reducers/users/userReducers";
import globalService from "../services";
import SocketService from "../socket/chat.socket";
import AuthService from "@/services/auth.service";
import NotificationService from "@/services/notification.service";
import { setUserInfo } from "@/redux/reducers/authReducer";
import Head from 'next/head';
import {
  setRecentChats,
  setSelectedChat,
  setAllWorkspaceByUser,
  setRead,
  anotherone
} from "../redux/reducers/chat/chatReducer";
import { useRouter } from "next/router";
import { setNewWorkSpace } from "@/redux/reducers/workspaceReducer";
import { setAllDocs } from "@/redux/reducers/documents/documentReducer";

function App({ Component, pageProps, ...appProps }) {
  return (
    <Provider store={store}>
      <Head>
        {/* Add this script tag to load the Jitsi Meet library */}
        <script src="https://jitsi.deepsoul.pro/external_api.js"></script>
      </Head>
      <AppWrapper Component={Component} pageProps={pageProps} {...appProps} />
    </Provider>
  );
}

// AppWrapper component created to enable the use of redux tools

const AppWrapper = ({ Component, pageProps, ...appProps }) => {
  const router = useRouter();
  const { userInfo, userAccessToken, refreshToken } = useSelector(
    (state: any) => state?.auth,
  );
  // State to hold the socket instance
  const [socket, setSocket] = useState<any | null>(null);
  const [newArr, setNewArr] = useState<any[]>([]);
  const [newMessages, setNewMessages] = useState();
  const userService = new globalService();
  const { allRecentChats, selectedChat } = useSelector(
    (state: any) => state?.chats
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
    const data = { uuid: userInfo?.uuid, country: userInfo?.country }
    await useSocket.updateData(data);
    await useSocket.getRecentChats({ uuid: userInfo?.uuid });
    await useSocket.allSpaceByUser({ uuid: userInfo?.uuid });
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
    // setLoading(true);
    try {
      AuthService
        .getUserViaAccessToken()
        .then((response) => {
          // setLoading(false);
          if (response?.status) {
            // console.log("user data via login", res);
            dispatch(setUserInfo(response?.data));
          }
        })
        .catch((err) => {
          NotificationService.error({
            message: "Error",
            addedText: "Could not fetch user data",
            position: "top-center",
          });
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    // confirm socket connection
    socketio.on("connected-id", (res) => {
      console.log("connected-id", res);
    });

    socketio.once("bot-new-msgs", (res) => {
      console.log("bot-new-msgs", res);
    });
    // get recent chats
    socketio.on("recent-chats", (res) => {
      let data = JSON.parse(res);
      dispatch(setRecentChats(data.data));
    });

    socketio.on("space-created", async (res) => {
      let data = JSON.parse(res);
      console.log("space-created", data.data, data);
      if (data.data) {
        dispatch(setNewWorkSpace(data.data));
        toast("Work Space Created", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        const useSocket = SocketService;
        await useSocket.getRecentChats({ uuid: userInfo?.uuid });
      }
    });
    socketio.on("space-joined", (res) => {
      let data = JSON.parse(res);
      console.log(" space-joined", data.data);
      // dispatch(setNewWorkSpace(data.data))
    });

    socketio.on("msg-sent", async (res) => {
      console.log("msg-sent", res);
      const useSocket = SocketService;
      await useSocket.getSelectedMsg({
        userId: userInfo?.uuid,
        uuid: res?.uuid,
      });
    });

    socketio.on("msg-sent-space", async (res) => {
      console.log("msg-sent-space", res);
      const useSocket = SocketService;
      await useSocket.getSelectedspace({
        spaceId: res?.space?.uuid,
        uuid: userInfo?.uuid,
      });
    });

    socketio.on("all-spaces-by-id", async (res) => {
      let response = JSON.parse(res);
      let data = JSON.parse(response?.data);
      console.log("all-spaces-by-id", data);
      dispatch(setAllWorkspaceByUser(data))
    });

    socketio.on("all-msgs-selected", (res) => {
      let data = JSON.parse(res);
      console.log("setSelectedChat", data);
      dispatch(setSelectedChat(data.data));
    });

    socketio.on("load-doc", (res) => {
      console.log(res, 'load')
      let data = JSON.parse(res);
      console.log("load-doc", data.data);
      // dispatch((data.data));
      toast("Document Created", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // router.push(`documents/${data?.data?._id}`)
    });

    socketio.once("retrieved-docs", (res) => {
      let data = JSON.parse(res);
      console.log("retrieved-docs", data);
      dispatch(setAllDocs(data.data));
      toast("All Documents", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    });

    socketio.once("error", (err) => {
      let data = JSON.parse(err);
      console.log("socket error", data);
      toast(`Something went wrong: ${data.message}`, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    });
  }, [socketio]);

  const isLayoutNeeded = appProps.router.pathname.includes("/auth");

  const LayoutWrapper = !isLayoutNeeded ? AppLayout : React.Fragment;

  return (
    <PersistGate loading="" persistor={persistor}>
      <LayoutWrapper>
        <motion.div
          key={appProps.router.route}
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
