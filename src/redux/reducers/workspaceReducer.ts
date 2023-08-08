import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

const workSpaceSlice = createSlice({
  name: "workSpace",
  initialState: {
    createSpace: null,
    createCollab: null,
  },

  reducers: {
    setSpace: (state: any, action: PayloadAction<{createSpace: any | null}>) => {
      state.createSpace = action?.payload;
      console.log(action)
    },
    setCollab: (state: any, action: PayloadAction<{createCollab: any | null}>) => {
      state.createCollab = action?.payload;
    },
  },
});


export const { setSpace, setCollab } = workSpaceSlice.actions;
export default workSpaceSlice.reducer;