import React from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/users/";

//* -----------------------------------Register an User------------------------------------//
const register = async (userInfo) => {
  console.log("Register from AuthService");
  const { userName, email, password, phoneNumber, address, age, bio } =
    userInfo;
  const USER = {
    userName,
    email,
    password,
    phoneNumber,
    address,
    age,
    bio,
  };
  console.log("UserInfo from AuthService", USER);
  const { data } = await axios.post(API_URL + "register", USER);
  if (data.token) {
    localStorage.setItem("user", JSON.stringify(data));
  }
  console.log("This is a registration data fron auth service :", data);
  return data;
};

//* -----------------------------------Login an User------------------------------------//

const login = async (email, password) => {
  const { data } = await axios.post(API_URL + "login", { email, password });
  if (data.token) {
    localStorage.setItem("user", JSON.stringify(data));
  }

  console.log("this user login Data");
  console.log(data);
  return data;
};

//* -----------------------------------Logout an User------------------------------------//

const logout = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  const { data } = await axios.post(API_URL + "logout", {}, config);
  localStorage.removeItem("user");
  return data;
};

const AuthService = {
  register,
  login,
  logout,
};
export default AuthService;
