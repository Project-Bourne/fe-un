/**
 * @file socket.ts
 * @description Socket.io client initialization and configuration
 */

import { io } from "socket.io-client";
import { Cookies } from "react-cookie";
import { ISocket, SocketConnectionOptions } from "../types/socket.types";

const cookies = new Cookies();

/**
 * Get authentication token from cookies
 * @returns {string} The authentication token or empty string if not found
 */
const getAuthToken = (): string => {
  if (typeof window === "undefined") return "";
  return cookies.get("deep-access") || "";
};

/**
 * Request headers for socket connection
 */
export const requestHeader: Record<string, string> = {
  "deep-token": getAuthToken(),
};

/**
 * Socket connection options
 */
const socketOptions: SocketConnectionOptions = {
  autoConnect: false,
  extraHeaders: requestHeader,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  timeout: 10000,
};

/**
 * Initialize and configure socket instance
 */
const socketio: ISocket = io(
  `http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_COLLAB_API_PORT}/`,
  socketOptions,
);

export default socketio;
