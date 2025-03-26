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

  /**
   * Emits an update event to the server with the given data.
   *
   * @param data - The data to send to the server.
   */
  updateData(data: any) {
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

  createWorkspace(data: any) {
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

  joinDocument(data: any) {
    try {
      this.socket.emit("add-collabs-to-doc", data);
    } catch (err) {
      NotificationService.error({
        message: err?.error?.message,
      });
    }
  }

  leaveDocument(data: any) {
    try {
      this.socket.emit("remove-collab-from-doc", data);
    } catch (err) {
      NotificationService.error({
        message: err?.error?.message,
      });
    }
  }

  getSelectedMsg(data: any) {
    // console.log("SELECTED MSG")
    try {
      this.socket.emit("get-msgs-selected", data);
    } catch (err) {
      NotificationService.error({
        message: err?.error?.message,
      });
    }
  }
  // get-msgs-selected-space

  getSelectedspace(data: any) {
    try {
      this.socket.emit("get-msgs-selected-space", data);
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

  createDoc(data: any) {
    try {
      this.socket.emit("get-doc", data);
    } catch (err) {
      NotificationService.error({
        message: err?.error?.message,
      });
    }
  }

  getDocHistory(data: any) {
    try {
      this.socket.emit("get-docs-by-id", data);
    } catch (err) {
      NotificationService.error({
        message: err?.error?.message,
      });
    }
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
  sendComment(data) {
    try {
      this.socket.emit("send-comment", data);
    } catch (err) {
      NotificationService.error({
        message: err?.error?.message,
      });
    }
  }

  getComments(data) {
    try {
      this.socket.emit("get-comments-in-doc", data);
    } catch (err) {
      NotificationService.error({
        message: err?.error?.message,
      });
    }
  }
  sendMessageSpace(data) {
    try {
      this.socket.emit("send-msg-space", data);
    } catch (err) {
      NotificationService.error({
        message: err?.error?.message,
      });
    }
  }

  //get-all-spaces-by-id
  allSpaceByUser(data) {
    try {
      this.socket.emit("get-all-spaces-by-id", data);
    } catch (err) {
      NotificationService.error({
        message: err?.error?.message,
      });
    }
  }

  //docs
  // send single message
  getDoc(data) {
    if (data?.id?.split("&")) {
      data = data?.id?.split("&")[0];
    }
    console.log("Doc to get: ", data);
    try {
      this.socket.emit("get-doc", data);
    } catch (err) {
      NotificationService.error({
        message: err?.error?.message,
      });
    }
  }
  readMsg(data) {
    try {
      this.socket.emit("read-msg", data);
    } catch (err) {
      NotificationService.error({
        message: err?.error?.message,
      });
    }
  }

  getDocById(data) {
    try {
      this.socket.emit("get-docs-by-id", data);
    } catch (err) {
      NotificationService.error({
        message: err?.error?.message,
      });
    }
  }
  saveDoc(data) {
    try {
      this.socket.emit("save-doc", data);
    } catch (err) {
      NotificationService.error({
        message: err?.error?.message,
      });
    }
  }
  updateCursor(data) {
    try {
      this.socket.emit("update-cursor", data);
    } catch (err) {
      NotificationService.error({
        message: err?.error?.message,
      });
    }
  }
  updateDoc(data) {
    try {
      if (!data || data == null) {
        this.socket.emit("update-doc", data);
      }
    } catch (err) {
      NotificationService.error({
        message: err?.error?.message,
      });
    }
  }
  updateChanges(data) {
    try {
      this.socket.emit("doc-update-changes", data);
    } catch (err) {
      NotificationService.error({
        message: err?.error?.message,
      });
    }
  }

  /**
   * Retrieves previous chat messages.
   * This is a dummy implementation that returns an empty array and should be replaced
   * with an actual API call or socket event that fetches previous chat history.
   *
   * @returns {Promise<any[]>} A promise that resolves to an array of chat messages.
   */
  static async getPreviousChatMessages(): Promise<any[]> {
    // TODO: Replace with actual implementation.
    return Promise.resolve([]);
  }

  /**
   * Sends a chat message via socket.
   * This is a dummy implementation and should be replaced with actual socket emit logic.
   *
   * @param {any} message - The chat message object to be sent.
   * @returns {Promise<void>} A promise that resolves when the message is sent.
   */
  static async sendMessage(message: any): Promise<void> {
    // TODO: Replace with actual implementation using socket emit.
    return Promise.resolve();
  }
}

/**
 * Export the SocketService class directly to allow static members to be accessed.
 */
export default SocketService;
