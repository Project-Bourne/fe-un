import socketio from "../utils/socket";

// type SocketIOClient = {
//     Socket:  any
// }

class SocketClass {
  private socket: any;

  constructor() {
    this.socket = socketio;
  }

  // get all chats between users
  async getAllMsgs() {
    this.socket.on("all-msgs", (data) => {
      console.log("get all chats ", data);
      // call a slice to update global state
    });
  }

  async updateData(data: { uuid: string }) {
    try {
      console.log({ data });
      this.socket.emit("update-data", data, (response) => {
        console.log("update data", response);
      });
    } catch (err) {
      console.log(err);
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
    this.socket.emit("", data);
  }
}

export default new SocketClass();
