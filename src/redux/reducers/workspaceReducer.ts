import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const workSpaceSlice = createSlice({
  name: "workSpace",
  initialState: {
    workSpaceId: "",
    createSpace: null,
    createCollab: [],
  },

  reducers: {
    setSpace: (state, action) => {
      state.createSpace = action.payload;
    },
    setSpaceId: (state, action) => {
      state.workSpaceId = action.payload;
    },
    setCollab: (state, action) => {
      state.createCollab = action.payload;
    },
  },
});

export const { setSpace, setCollab, setSpaceId } = workSpaceSlice.actions;
export default workSpaceSlice.reducer;
