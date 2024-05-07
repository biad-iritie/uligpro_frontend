import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  error: null,
  user: {},
  accessToken: "",
  activationToken: "",
};

export const addLoggedUser = createAsyncThunk(
  "auth/login",
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

export const getLoggedUser = createAsyncThunk(
  "auth/loggedUser",
  async (credentials) => {
    const response = await credentials.loggedUserFunc();
    //console.log(response);
    return response.data.getLoggedInUser;
  }
);

export const getActivationToken = createAsyncThunk(
  "auth/getActivationToken",
  async (credentials) => {
    const response = await credentials.getActivationTokenFunc({
      variables: {
        email: credentials.email,
        password: credentials.password,
        name: credentials.name,
        tel: credentials.tel,
      },
    });
    //console.log(response.data);
    return response.data.registerRegularUser;
  }
);

export const activateUserAccount = createAsyncThunk(
  "auth/activateUser",
  async (credentials) => {
    const response = await credentials.activateUserFunc({
      variables: {
        activationCode: credentials.activationCode,
        activationToken: credentials.activationToken,
      },
    });
    return response.data.activateUser;
  }
);

const User = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getUserCredentials: (state, action) => {
      //it's ok to do this because the immer makes it immutable
      //under the hood
      //state.user = action.payload.user;
      //state.accessToken = action.payload.accessToken;
      //state.refreshToken = action.payload.refreshToken;
    },
    getActivationCode: (state) => {
      state.activationToken = localStorage.getItem("activationToken");
    },
    logout: (state) => {
      //state.status = "idle";
      //console.log("logout");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      state.status = "idle";
      state.user = {};
      //state.status = "idle";
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addLoggedUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addLoggedUser.fulfilled, (state, action) => {
        console.log("addLoggedUser");
        // Add any fetched posts to the array
        if (action.payload.user) {
          state.user = action.payload.user;
          /* state.accessToken = action.payload.accessToken;
          state.refreshToken = action.payload.refreshToken; */

          // Saving data to session storage
          localStorage.setItem(
            "accessToken",
            JSON.stringify(action.payload.accessToken)
          );
          localStorage.setItem(
            "refreshToken",
            JSON.stringify(action.payload.refreshToken)
          );
          state.status = "succeeded";
        } else {
          state.status = "failed";
          state.error = action.payload.error.message;
        }
      })
      .addCase(addLoggedUser.rejected, (state, action) => {
        console.log(action.error.message);
        state.status = "failed";
        state.error = action.error.message;
      })

      // GET CREDENTIAL DATA

      .addCase(getLoggedUser.fulfilled, (state, action) => {
        //console.log(action);
        // Add any fetched posts to the array
        if (action.payload.user) {
          state.user = action.payload.user;
          //state.accessToken = action.payload.accessToken;
          /* state.refreshToken = action.payload.refreshToken; */

          /* // Saving data to session storage
          localStorage.setItem(
            "accessToken",
            JSON.stringify(action.payload.accessToken)
          );
          localStorage.setItem(
            "refreshToken",
            JSON.stringify(action.payload.refreshToken)
          ); */
          state.status = "succeeded";
        } else {
          state.status = "failed";
          state.error = action.payload.error?.message;
        }
        state.status = "idle";
      })

      // GET ACTIVATION TOKEN
      .addCase(getActivationToken.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getActivationToken.fulfilled, (state, action) => {
        //console.log(action);
        // Add any fetched posts to the array
        state.status = "succeeded";
        if (action.payload.activationToken) {
          state.activationToken = action.payload.activationToken;
          // Saving data to session storage
          /* localStorage.setItem(
            "activationToken",
            JSON.stringify(action.payload.activationToken)
          ); */
        } else {
          state.status = "failed";
          state.error = action.payload.error.message;
        }
      })
      .addCase(getActivationToken.rejected, (state, action) => {
        //console.log(action.error.message);
        state.status = "failed";
        state.error = action.error.message;
      })

      //ACTIVATE USER
      .addCase(activateUserAccount.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(activateUserAccount.fulfilled, (state, action) => {
        //console.log(action.payload);
        // Add any fetched posts to the array
        if (action.payload.user) {
          state.user = action.payload.user;
          /* state.accessToken = action.payload.accessToken;
          state.refreshToken = action.payload.refreshToken; */

          // Saving data to session storage
          localStorage.setItem(
            "accessToken",
            JSON.stringify(action.payload.accessToken)
          );
          localStorage.setItem(
            "refreshToken",
            JSON.stringify(action.payload.refreshToken)
          );
          state.status = "succeeded";
        } else {
          state.status = "failed";
          state.error = action.payload.error.message;
        }
      })
      .addCase(activateUserAccount.rejected, (state, action) => {
        //console.log(action.error.message);
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { getUserCredentials, logout } = User.actions;
export default User.reducer;
