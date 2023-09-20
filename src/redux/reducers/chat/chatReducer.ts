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
    selectedChat: [],
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

export const { setActivechat, setRecentChats, setSelectedChat, AddNewChat } =
  chatSlice.actions;
export default chatSlice.reducer;
