import React from "react";
import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3000/users/";

const getUserById = async (id) => {
  const { data } = await axios.get(API_URL + id);
  if (data) {
    return data;
  }
  return {};
};

const getMyProfile = async () => {
  const { data } = await axios.get(API_URL + "me", { headers: authHeader() });
  if (data) {
    return data;
  }
  return {};
};

const userService = {
  getUserById,
  getMyProfile,
};

export default userService;
