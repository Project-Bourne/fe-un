import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RecentChats } from "./models";

const chatSlice = createSlice({
  name: "chats",
  initialState: {
    activeChat: undefined,
    allRecentChats: [],
    allMessages: [],
  },
  reducers: {
    setActiveChat: (
      state: any,
      action: PayloadAction<{ openChat: string }>,
    ) => {
      state.activeChat = action?.payload;
    },
    setRecentChats: (state: any, action) => {
      state.allRecentChats.push(action?.payload);
    },
    updateUserMsgs: (state: any, action) => {
      // get userId and new messages from payload
      const { userId, firstName, lastName, img, newMessages } = action.payload;
      // find specific user using the sent userId
      const userIndex = state.allRecentChats.findIndex(
        (user: any) => user.userId === userId,
      );
      // update 'messages' array if user exists
      console.log("from slice: userIndex", userIndex);
      if (userIndex !== -1) {
        state.allRecentChats[userIndex].messages = newMessages;
        state.allRecentChats[userIndex].newMessageCount += 1;
      } else {
        state.allRecentChats.push({
          userId,
          firstName,
          lastName,
          img,
          messages: newMessages,
          newMessagesCount: 1,
        });
      }
    },
    setAllMessages: (
      state: any,
      action: PayloadAction<{ allMessages: any }>,
    ) => {
      const { data }: any = action?.payload;
      for (let i = 0; i < data.length; i++) {
        const msgIndex = state.allMessages.findIndex(
          (msg) => msg._id === data[i]._id,
        );
        if (msgIndex === -1) {
          state.allMessages.push(data[i]);
        }
      }
    },
    clearMessages: (state: any) => {
      state.newMessage = 0;
      state.allMessages = [];
    },
    deleteMessage: (
      state: any,
      action: PayloadAction<{ allMessages: any }>,
    ) => {
      state.allMessages.push(action?.payload);
    },
  },
});

export const {
  setActiveChat,
  setRecentChats,
  updateUserMsgs,
  setAllMessages,
  clearMessages,
  deleteMessage,
} = chatSlice.actions;
export default chatSlice.reducer;
