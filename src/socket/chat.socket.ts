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
    console.log(data, "workspace data");
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
    console.log(data, "dta");
    try {
      this.socket.emit("add-collabs-to-doc", data);
    } catch (err) {
      NotificationService.error({
        message: err?.error?.message,
      });
    }
  }

  leaveDocument(data: any) {
    console.log(data, "dta");
    try {
      this.socket.emit("remove-collab-from-doc", data);
    } catch (err) {
      NotificationService.error({
        message: err?.error?.message,
      });
    }
  }

  getSelectedMsg(data: any) {
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
    console.log(data, "chisommmmm");
    try {
      this.socket.emit("send-comment", data);
    } catch (err) {
      NotificationService.error({
        message: err?.error?.message,
      });
    }
  }

  getComments(data) {
    console.log(data, "chisommmmm");
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
    console.log(data, "all workspaces");
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
    try {
      this.socket.emit("get-doc", data);
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

  updateChanges(data) {
    try {
      this.socket.emit("doc-update-changes", data);
    } catch (err) {
      NotificationService.error({
        message: err?.error?.message,
      });
    }
  }
}

export default new SocketService();
