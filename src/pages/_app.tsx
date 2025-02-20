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
import SocketService from "../socket/chat.socket";
import AuthService from "@/services/auth.service";
import NotificationService from "@/services/notification.service";
import { setUserInfo } from "@/redux/reducers/authReducer";
import Head from "next/head";
import Script from "next/script";
import {
  setRecentChats,
  setSelectedChat,
  setAllWorkspaceByUser,
  setRead,
  anotherone,
  setComments,
  updateChat,
  setLoading,
  IncreementChat,
} from "../redux/reducers/chat/chatReducer";
import { useRouter } from "next/router";
import { setNewWorkSpace } from "@/redux/reducers/workspaceReducer";
import {
  setAllDocs,
  setCollaborators,
  setSingleDoc,
} from "@/redux/reducers/documents/documentReducer";

function App({ Component, pageProps, ...appProps }) {
  return (
    <Provider store={store}>
      {/* <Head>
      </Head> */}
      <Script
        src="https://jitsi.deepsoul.pro/external_api.js"
        strategy="beforeInteractive"
        onLoad={() => {
          console.log("Jitsi script loaded successfully");
        }}
      />
      <AppWrapper Component={Component} pageProps={pageProps} {...appProps} />
    </Provider>
  );
}

// AppWrapper component created to enable the use of redux tools

const AppWrapper = ({ Component, pageProps, ...appProps }) => {
  const router = useRouter();
  const { userInfo } = useSelector((state: any) => state?.auth);
  const dispatch = useDispatch();
  const pageAnimationVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.5 } },
  };

  // initial user update using authenticated UUID on app mount
  const _constructor = async () => {
    const useSocket = SocketService;
    const data = { uuid: userInfo?.uuid, country: userInfo?.country };
    await useSocket.updateData(data);
    await useSocket.getRecentChats({ uuid: userInfo?.uuid });
    await useSocket.allSpaceByUser({ uuid: userInfo?.uuid });
    await useSocket.readMsg({ senderId: userInfo?.uuid });
  };

  useEffect(() => {
    if (router.pathname === "/" || router.pathname === "") {
      router.replace("/chats");
    }
  }, []);

  useEffect(() => {
    try {
      AuthService.getUserViaAccessToken()
        .then((response) => {
          if (response?.status) {
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

  // initiate socket connection
  useEffect(() => {
    socketio.connect();
    _constructor();
    return () => {
      socketio.disconnect();
    };
  }, []);

  useEffect(() => {
    socketio.once("connected-id", (res) => {
      console.log("connected-id", res);
    });

    socketio.on("msg-read", (res) => {
      console.log("msg-read", res);
      dispatch(updateChat(res?.senderId));
    });

    socketio.once("bot-new-msgs", (res) => {
      console.log("bot-new-msgs", res);
    });
    // get recent chats
    socketio.once("recent-chats", (res) => {
      let data = JSON.parse(res);
      dispatch(setRecentChats(data.data));
    });
    socketio.once("error", (err) => {
      let errorData = err;
      console.log(err, "error socket");
      if (typeof err === "string") {
        try {
          errorData = JSON.parse(err);
        } catch (e) {
          console.error("Error parsing JSON:", e);
        }
      }
      console.log("socket error", errorData);
      toast(`Something went wrong: ${errorData?.message || errorData}`, {
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

  useEffect(() => {
    if (!userInfo) return;

    socketio.on("space-created", async (res) => {
      let data = JSON.parse(res);
      console.log("space-created", data.data, data);
      if (data.data) {
        const useSocket = SocketService;
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
        await useSocket.getRecentChats({ uuid: userInfo?.uuid });
        await useSocket.allSpaceByUser({ uuid: userInfo?.uuid });
      }
    });

    socketio.on("space-joined", (res) => {
      let data = JSON.parse(res);
      console.log(" space-joined", data.data);
      toast("Collaborator Added", {
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

    socketio.on("msg-sent", async (res) => {
      console.log("msg-sent", res);
      const useSocket = SocketService;
      await useSocket.getSelectedMsg({
        userId: userInfo?.uuid,
        uuid: res?.sender?.id,
      });
    });

    socketio.on("msg-sent-space", async (res) => {
      console.log("msg-sent-space", res);
      const useSocket = SocketService;
      await useSocket.getSelectedspace({
        spaceId: res?.space?.uuid,
        uuid: res?.userId,
      });
    });

    socketio.on("all-spaces-by-id", async (res) => {
      let response = JSON.parse(res);
      let data = JSON.parse(response?.data);
      console.log("all-spaces-by-id", data);
      dispatch(setAllWorkspaceByUser(data));
    });

    socketio.on("new-message", async (res) => {
      console.log("new-message", res);
      const useSocket = SocketService;
      if (!userInfo) return;
      if (res?.space) {
        await useSocket.getSelectedspace({
          spaceId: res?.space?.uuid,
          uuid: res?.sender.id,
        });
        await useSocket.readMsg({ senderId: userInfo?.uuid });
      } else {
        await useSocket.getSelectedMsg({
          userId: userInfo?.uuid,
          uuid: res?.userId,
        });
        await useSocket.readMsg({ senderId: userInfo?.uuid });
      }
    });

    socketio.on("all-msgs-selected", async (res) => {
      dispatch(setSelectedChat([]));
      dispatch(IncreementChat(null));
      try {
        let data = JSON.parse(res);
        console.log("setSelectedChat", data);
        if (data.data.length > 0) {
          dispatch(setSelectedChat(data.data));
          for (let i = data.data.length; i < 1; i--) {
            dispatch(IncreementChat(data.data[i]));
          }
        } else {
          return;
        }
        dispatch(setLoading(false));
      } catch (error) {
        console.log(error);
        dispatch(setLoading(false));
      }
    });

    socketio.on("retrieved-docs", (res) => {
      let data = JSON.parse(res);
      console.log("retrieved-docs", data);
      dispatch(setAllDocs(data.data));
    });

    socketio.once("collabs-added", (res) => {
      let data = JSON.parse(res);
      console.log("collabs-added", data);
      dispatch(setCollaborators(data?.data?.collaborators));
      // SocketService.getDoc({ id: data._id });
      toast("Collabs Added", {
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
