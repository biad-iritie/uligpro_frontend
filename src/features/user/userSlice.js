import { createSlice } from "@reduxjs/toolkit";
import { any } from "prop-types";

const initialState = {
  user: any,
};

const User = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    login: (state, action) => {
      //it's ok to do this because the immer makes it immutable
      //under the hood
      state.user = action.user;
    },
  },
});

export const { login } = User.actions;
export default User.reducer;
