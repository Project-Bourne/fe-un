import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const workSpaceSlice = createSlice({
  name: "workSpace",
  initialState: {
    newWorkspace: {},
    spaceData: {},
  },

  reducers: {
    setNewWorkSpace: (state, action) => {
      state.newWorkspace = action.payload;
    },
  },
});

export const { setNewWorkSpace } = workSpaceSlice.actions;
export default workSpaceSlice.reducer;
