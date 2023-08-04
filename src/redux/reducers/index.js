import { combineReducers } from "@reduxjs/toolkit";
import workSpaceSlice from './workspaceReducer'

const rootReducer = combineReducers({ 
    workSpace: workSpaceSlice,
});

export default rootReducer;