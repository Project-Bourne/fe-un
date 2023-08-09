import { combineReducers } from "@reduxjs/toolkit";
import workSpaceSlice from './workspaceReducer';
import chatSlice from './chat/chatReducer';
import dashboardSlice from './dashboard/dashboardReducer';

const rootReducer = combineReducers({ 
    workSpace: workSpaceSlice,
    chat: chatSlice,
    dashboard: dashboardSlice
});

export default rootReducer;