import { combineReducers } from "@reduxjs/toolkit";
import workSpaceSlice from './workspaceReducer';
import chatSlice from './chat/chatReducer';
import dashboardSlice from './dashboard/dashboardReducer';
import userSlice from './users/userReducers';
import docSlice from './documents/documentReducer'
import authSlice from './authReducer'

const rootReducer = combineReducers({ 
    workSpace: workSpaceSlice,
    chats: chatSlice,
    dashboard: dashboardSlice,
    users: userSlice,
    docs: docSlice,
    auth: authSlice
});

export default rootReducer;