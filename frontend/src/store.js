import { configureStore } from "@reduxjs/toolkit";
import houseSlice from "./features/houses/houseSlice";

export const store = configureStore({
  reducer: {
    houses: houseSlice,
  },
});
