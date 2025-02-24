/**
 * @file socketInstance.ts
 * @description Provides a singleton instance of SocketService for use throughout the app
 */

import SocketService from "../socket/chat.socket";

// Create a singleton instance
const socketInstance = new SocketService();

export default socketInstance;
