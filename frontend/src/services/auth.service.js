import React from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/users/";

//* -----------------------------------Register an User------------------------------------//
const register = async (
  username,
  email,
  password,
  phoneNumber,
  address,
  age,
  bio
) => {
  const userInfo = {
    username,
    email,
    password,
    phoneNumber,
    address,
    age,
    bio,
  };
  const { data } = await axios.post(API_URL + "register", userInfo);
  if (data.token) {
    localStorage.setItem("user", JSON.stringify(data));
  }
  return data;
};

//* -----------------------------------Login an User------------------------------------//

const login = async (email, password) => {
  const { data } = await axios.post(API_URL + "login", { email, password });
  if (data.token) {
    localStorage.setItem("user", JSON.stringify(data));
  }
  return data;
};

//* -----------------------------------Logout an User------------------------------------//

const logout = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  localStorage.removeItem("user");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  };
  const { data } = await axios.post(API_URL + "logout", config);
  return data;
};

const AuthService = {
  register,
  login,
  logout,
};
export default AuthService;
