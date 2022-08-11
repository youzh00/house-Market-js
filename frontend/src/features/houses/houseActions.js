import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchHouses = createAsyncThunk(
  "houses/fetchHouses",
  async (queries) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/houses?${queries}`
      );
      return [...data];
    } catch (error) {
      console.log(error);
    }
  }
);
