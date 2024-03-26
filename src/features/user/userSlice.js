import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { gql, useMutation } from "@apollo/client";

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(userInput: { email: $email, password: $password }) {
      user {
        name
        email
        tel
      }
      accessToken
      refreshToken
      error {
        code
        message
      }
    }
  }
`;

const initialState = {
  status: "idle",
  error: null,
  user: {},
  accessToken: "",
  refreshToken: "",
};

export const addLoggedUser = createAsyncThunk(
  "authentication/login",
  async (credentials) => {
    const response = await credentials.loginFunc({
      variables: {
        email: credentials.email,
        password: credentials.password,
      },
    });
    return response.data.login;
  }
);

const User = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    login: (state, action) => {
      //it's ok to do this because the immer makes it immutable
      //under the hood
      //state.user = action.payload.user;
      //state.accessToken = action.payload.accessToken;
      //state.refreshToken = action.payload.refreshToken;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addLoggedUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addLoggedUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        //console.log(action);
        // Add any fetched posts to the array
        if (action.payload.user) {
          state.user = action.payload.user;
          state.accessToken = action.payload.accessToken;
          state.refreshToken = action.payload.refreshToken;

          // Saving data to session storage
          sessionStorage.setItem(
            "accessToken",
            JSON.stringify(action.payload.accessToken)
          );
          sessionStorage.setItem(
            "refreshToken",
            JSON.stringify(action.payload.refreshToken)
          );
        } else {
          state.status = "failed";
          state.error = action.payload.error.message;
        }
      })
      .addCase(addLoggedUser.rejected, (state, action) => {
        console.log(action.error.message);
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { login } = User.actions;
export default User.reducer;
