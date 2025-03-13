"use client";

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
import "../polyfills";
import socketInstance from "../utils/socketInstance";
import "@/styles/globals.css";
import "@/styles/global.css";
import { Inter } from "next/font/google";
import type { AppProps } from "next/app";
import { redirectToLogin } from "@/utils/auth";
import { Cookies } from "react-cookie";

const inter = Inter({ subsets: ["latin"] });

/**
 * Main App component that wraps the entire application
 * Handles global providers, layout, and animations
 */
function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Script
            src={`http://${process.env.NEXT_PUBLIC_JITSI_URL}:${process.env.NEXT_PUBLIC_JITSI_JS_PORT}/external_api.js`}
            strategy="afterInteractive"
            onLoad={() => {
              console.log("Jitsi script loaded successfully");
            }}
          />
          <AppWrapper Component={Component} pageProps={pageProps} />
          <ToastContainer />
        </PersistGate>
      </Provider>
    </>
  );
}

/**
 * AppWrapper component that handles layout and page transitions
 */
const AppWrapper = ({
  Component,
  pageProps,
}: {
  Component: any;
  pageProps: any;
}) => {
  const router = useRouter();
  const { userInfo } = useSelector((state: any) => state?.auth);
  const dispatch = useDispatch();
  const cookies = new Cookies();

  const pageAnimationVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.5 } },
  };

  // initial user update using authenticated UUID on app mount
  const _constructor = async () => {
    const data = { uuid: userInfo?.uuid, country: userInfo?.country };
    await socketInstance.updateData(data);
    await socketInstance.getRecentChats({ uuid: userInfo?.uuid });
    await socketInstance.allSpaceByUser({ uuid: userInfo?.uuid });
    await socketInstance.readMsg({ senderId: userInfo?.uuid });
  };

  useEffect(() => {
    if (router.pathname === "/" || router.pathname === "") {
      router.replace("/chats");
    }
  }, []);

  // Check for authentication cookie on route changes
  useEffect(() => {
    const handleRouteChange = () => {
      // Skip auth check for auth pages to prevent redirect loops
      if (router.pathname.startsWith("/auth")) {
        return;
      }

      // Check for deep-access cookie
      const hasDeepAccessCookie = cookies.get("deep-access");

      if (!hasDeepAccessCookie) {
        console.log("No deep-access cookie found, redirecting to login");
        // Use our utility function to redirect
        redirectToLogin();
      }
    };

    // Add route change listeners
    router.events.on("routeChangeComplete", handleRouteChange);

    // Initial check on mount
    handleRouteChange();

    // Cleanup
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);

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
        await socketInstance.getRecentChats({ uuid: userInfo?.uuid });
        await socketInstance.allSpaceByUser({ uuid: userInfo?.uuid });
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
      await socketInstance.getSelectedMsg({
        userId: userInfo?.uuid,
        uuid: res?.sender?.id,
      });
    });

    socketio.on("msg-sent-space", async (res) => {
      console.log("msg-sent-space", res);
      await socketInstance.getSelectedspace({
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
      if (!userInfo) return;
      if (res?.space) {
        await socketInstance.getSelectedspace({
          spaceId: res?.space?.uuid,
          uuid: res?.sender.id,
        });
        await socketInstance.readMsg({ senderId: userInfo?.uuid });
      } else {
        await socketInstance.getSelectedMsg({
          userId: userInfo?.uuid,
          uuid: res?.userId,
        });
        await socketInstance.readMsg({ senderId: userInfo?.uuid });
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

  // Check if we're on an auth page
  const isAuthPage = router.pathname.startsWith("/auth");

  // Use AppLayout for non-auth pages, Fragment for auth pages
  const LayoutWrapper = !isAuthPage ? AppLayout : React.Fragment;

  return (
    <LayoutWrapper>
      <motion.div
        key={router.route}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={pageAnimationVariants}
      >
        <Component {...pageProps} />
      </motion.div>
    </LayoutWrapper>
  );
};

export default App;
