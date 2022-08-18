import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setMessage } from "./messageSlice";
import AuthService from "../../services/auth.service";
const user = JSON.parse(localStorage.getItem("user"));

//* ----------------------------------- Register Action --------------------------------//
export const register = createAsyncThunk(
  "auth/register",
  async (
    { userName, email, password, phoneNumber, address, age, bio },
    thunkAPI
  ) => {
    try {
      console.log("this is from register slice data ");
      const userInfo = {
        userName,
        email,
        password,
        phoneNumber,
        address,
        age,
        bio,
      };
      console.log("UserInfo from register slice data :", userInfo);
      const data = await AuthService.register(userInfo);
      thunkAPI.dispatch(setMessage("success"));
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

//* ----------------------------------- Login Action --------------------------------//

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await AuthService.login(email, password);
      return { user: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

//* ----------------------------------- Logout Action --------------------------------//
export const logout = createAsyncThunk("auth/logout", async () => {
  console.log("logged out");
  await AuthService.logout();
});

//* ----------------------------------- Initial State --------------------------------//

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

//* ----------------------------------- Authentification Slice  --------------------------------//

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.user = action.payload.user;
      state.isLoggedIn = true;
    },
    [register.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

const { reducer } = authSlice;
export default reducer;
