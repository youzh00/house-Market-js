import { configureStore } from "@reduxjs/toolkit";
import houseSlice from "./features/houses/houseSlice";
import authReducer from "./features/user/authSlice";
import messageReducer from "./features/user/messageSlice";

const reducer = {
  auth: authReducer,
  message: messageReducer,
};

const store = configureStore({
  reducer: reducer,
  devTools: true,
});
export default store;
