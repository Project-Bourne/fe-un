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

  // listen for 1-to-1 chats between users

  updateData(data: { uuid: string }) {
    try {
      this.socket.emit("update-data", data);
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
    this.socket.emit("send-msg", data);
  }
}

export default new SocketService();
