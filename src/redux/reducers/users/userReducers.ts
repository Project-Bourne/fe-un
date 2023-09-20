import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    allUsers: [],
  },
  reducers: {
    setUsers: (state: any, action: PayloadAction<{ allUsers: any[] }>) => {
      state.allUsers = action.payload;
    },
  },
});

export const { setUsers } = userSlice.actions;
export default userSlice.reducer;
