import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const workSpaceSlice = createSlice({
  name: "workSpace",
  initialState: {
    createSpace: null,
    createCollab: null,
  },

  reducers: {
    setSpace: (state, action) => {
      state.createSpace = action.payload;
      console.log(action)
    },
    setCollab: (state, action) => {
      state.createCollab = action.payload;
    },
  },
});


export const { setSpace, setCollab } = workSpaceSlice.actions;
export default workSpaceSlice.reducer;