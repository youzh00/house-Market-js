import { createSlice } from "@reduxjs/toolkit";
import { fetchHouses } from "./houseActions";

//**------------------------------ INITIAL STATE --------------------------------**//

const initialState = {
  houses: [],
  status: "idle",
  error: null,
};

//**------------------------------ SLICE ----------------------------------**//

const houseSlice = createSlice({
  name: "houses",
  initialState,
  reducers: {},
  //**-------EXTRA REDUCERS -------//
  extraReducers(builder) {
    builder
      .addCase(fetchHouses.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchHouses.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched posts to the array
        state.posts = state.posts.concat(action.payload);
      })
      .addCase(fetchHouses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectAllPosts = (state) => state.houses;
export const selectStatus = (state) => state.houses.status;
export const selectError = (state) => state.houses.error;
export const selectPostById = (state, houseId) => {
  return state.houses.find((house) => {
    return house.id === houseId;
  });
};
export default houseSlice.reducer;
