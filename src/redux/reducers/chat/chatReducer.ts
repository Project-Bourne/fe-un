import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RecentChats } from "./models";

const chatSlice = createSlice({
    name: 'chats',
    initialState: {
        newMessage: 0,
        activeChat: null,
        allRecentChats: [],
        allMessages: [],
    },
    reducers: {
        setNewMessage: ( state: any ) => {
            state.newMessage += 1;
        },
        setActiveChat: (state: any, action: PayloadAction<{openChat: string}>) => {
            state.activeChat = action?.payload
        },
        setRecentChats: ( state: any, action) => {
            state.allRecentChats.push(action?.payload);
        },
        setAllMessages: ( state: any, action: PayloadAction<{allMessages: any}>) => {
            state.allMessages.push(action?.payload);
        },
        clearMessages: ( state: any ) => {
            state.newMessage = 0;
            state.allMessages = [];
        },
        deleteMessage: ( state: any, action: PayloadAction<{allMessages: any}>) => {
            state.allMessages.push(action?.payload);
        }
    }
});

export const { setNewMessage, setActiveChat, setRecentChats, setAllMessages, clearMessages, deleteMessage } = chatSlice.actions;
export default chatSlice.reducer;