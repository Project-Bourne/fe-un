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
    comments: [],
    loading: false,
    page: 0,
    reload: false,
  },
  reducers: {
    setActivechat: (state: any, action: SetActiveChatAction) => {
      state.activeChat = action?.payload;
    },
    setReload: (state: any, action: any) => {
      state.reload = action.payload;
    },
    updateChat: (state, action) => {
      const chatUuidToUpdate = action.payload; // Assuming you pass the uuid as payload

      if (Array.isArray(state.allRecentChats)) {
        // Check if allRecentChats is an array
        const chatIndex = state.allRecentChats.findIndex(
          (chat) => chat.uuid === chatUuidToUpdate,
        );

        if (chatIndex !== -1) {
          // If a chat with the provided uuid is found, update its unreadLength to 0
          state.allRecentChats[chatIndex].unreadLength = 0;
        }
      }
    },

    setPage: (state: any, action) => {
      state.page = action?.payload;
    },
    setRecentChats: (state: any, action) => {
      state.allRecentChats = action?.payload;
    },
    IncreementChat: (state: any, action) => {
      // if (!Array.isArray(state.selectedChat)) {
      //  if(Array.isArray(state.action?.payload)) return
      //   state.selectedChat = []; // Initialize as an array if it's not already
      // }
      state.selectedChat.unshift(action?.payload);
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
    setLoading: (state: any, action) => {
      state.loading = action?.payload;
    },
  },
});

export const {
  IncreementChat,
  updateChat,
  setActivechat,
  setRead,
  setRecentChats,
  anotherone,
  setComments,
  setSelectedChat,
  AddNewChat,
  setAllWorkspaceByUser,
  setLoading,
  setPage,
  setReload,
} = chatSlice.actions;
export default chatSlice.reducer;
