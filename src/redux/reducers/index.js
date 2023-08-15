import { combineReducers } from "@reduxjs/toolkit";
import workSpaceSlice from './workspaceReducer';
import chatSlice from './chat/chatReducer';
import dashboardSlice from './dashboard/dashboardReducer';
import userSlice from './users/userReducers';

const rootReducer = combineReducers({ 
    workSpace: workSpaceSlice,
    chats: chatSlice,
    dashboard: dashboardSlice,
    users: userSlice,
});

export default rootReducer;