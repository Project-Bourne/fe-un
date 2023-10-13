import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// import { RecentChats } from "./models";
type SetActiveChatAction = {
  type: string; // The action type, e.g., "chats/setActivechat"
  payload: any; // The payload of the action
};

const docSlice = createSlice({
  name: "docs",
  initialState: {
    allDocs: [],
    singleDoc: null,
  },
  reducers: {
    setAllDocs: (state: any, action: SetActiveChatAction) => {
      state.allDocs = action.payload;
    },
    setSingleDoc: (state: any, action: SetActiveChatAction) => {
      state.singleDoc = action.payload;
    },
  },
});

export const { setAllDocs, setSingleDoc } = docSlice.actions;
export default docSlice.reducer;
