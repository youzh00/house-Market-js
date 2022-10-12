import { configureStore } from "@reduxjs/toolkit";
import houseSlice from "./features/houses/houseSlice";
import authReducer from "./features/auth/authSlice";
import messageReducer from "./features/user/messageSlice";
import { apiSlice } from "./api/apiSlice";

const reducer = {
  [apiSlice.reducerPath]: apiSlice.reducer ,
  auth: authReducer,
  message: messageReducer,
};

const store = configureStore({
  reducer: reducer,
  devTools: true,
  middleware:(getDefaultMiddleware)=> getDefaultMiddleware().concat(apiSlice.middleware)
});
export default store;
