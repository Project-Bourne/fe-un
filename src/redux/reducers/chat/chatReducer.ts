import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RecentChats } from "./models";
type SetActiveChatAction = {
  type: string; // The action type, e.g., "chats/setActivechat"
  payload: any; // The payload of the action
};

const chatSlice = createSlice({
  name: "chats",
  initialState: {
    activeChat: null,
    allRecentChats: [],
    allWorkspaceByUser: [],
    selectedChat: [],
    read: false,
    comments: [],
  },
  reducers: {
    setActivechat: (state: any, action: SetActiveChatAction) => {
      state.activeChat = action?.payload;
    },
    setRecentChats: (state: any, action) => {
      state.allRecentChats = action?.payload;
    },
    setSelectedChat: (state: any, action) => {
      state.selectedChat = action?.payload;
    },
    anotherone: (state: any, action) => {
      state.selectedChat.push(action?.payload);
    },
    setAllWorkspaceByUser: (state: any, action) => {
      state.allWorkspaceByUser = action?.payload;
    },
    setRead: (state: any, action) => {
      state.selectedChat = action?.payload;
    },
    setComments: (state: any, action) => {
      state.comments = action?.payload;
    },
    AddNewChat: (state: any, action) => {
      let arrayExists = state.allRecentChats.some(
        (obj) => obj.uuid === action?.payload.uuid,
      );
      if (!arrayExists) {
        state.allRecentChats.push(action?.payload);
      } else {
        return;
      }
    },
  },
});

export const {
  setActivechat,
  setRead,
  setRecentChats,
  anotherone,
  setComments,
  setSelectedChat,
  AddNewChat,
  setAllWorkspaceByUser,
} = chatSlice.actions;
export default chatSlice.reducer;
