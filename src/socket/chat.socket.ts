import NotificationService from "../services/notification.service";
import socketio from "../utils/socket";

// type SocketIOClient = {
//     Socket:  any
// }

class SocketService {
  private socket: any;

  constructor() {
    this.socket = socketio;
  }
  updateData(data: { uuid: string }) {
    try {
      this.socket.emit("update-data", data);
    } catch (err) {
      NotificationService.error({
        message: err?.error?.message,
      });
    }
  }

  getRecentChats(data: { uuid: string }) {
    try {
      this.socket.emit("get-recent-chats", data);
    } catch (err) {
      NotificationService.error({
        message: err?.error?.message,
      });
    }
  }

  createWorkspace(data: {
    spaceName: string;
    description: string;
    creatorId: string;
  }) {
    try {
      this.socket.emit("create-space", data);
    } catch (err) {
      NotificationService.error({
        message: err?.error?.message,
      });
    }
  }

  joinWorkspace(data: { space: any; user: any; inviter: any }) {
    try {
      this.socket.emit("join-space", data);
    } catch (err) {
      NotificationService.error({
        message: err?.error?.message,
      });
    }
  }

  getSelectedMsg(data: { userId: string; uuid: string }) {
    try {
      this.socket.emit("get-msgs-selected", data);
    } catch (err) {
      NotificationService.error({
        message: err?.error?.message,
      });
    }
  }

  // get single chat
  getNewMessage(): void {
    this.socket.on("", (data) => {
      console.log("get single message ", data);
      // call a slice to update global state
    });
  }

  readMessage(): void {
    this.socket.on("read-message", (data) => {
      console.log("read message ", data);
    });
  }

  // send single message
  sendMessage(data) {
    try {
      this.socket.emit("send-msg", data);
    } catch (err) {
      NotificationService.error({
        message: err?.error?.message,
      });
    }
  }
}

export default new SocketService();
