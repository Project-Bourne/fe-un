import { combineReducers } from "@reduxjs/toolkit";
import workSpaceSlice from './workspaceReducer';
import chatSlice from './chat/chatReducer';

const rootReducer = combineReducers({ 
    workSpace: workSpaceSlice,
    chat: chatSlice
});

export default rootReducer;