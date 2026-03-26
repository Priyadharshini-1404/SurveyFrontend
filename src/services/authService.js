import baseApi from "../api/api";

// src/services/authService.js

export const loginUser = async (email, password) => {
  const res = await baseApi.post(`/auth/login`, {
    email,
    password,
  });
  return res;
};

export const registerUser = async ({ name, email, password }) => {
  const res = await baseApi.post(`/auth/register`, {
    name,
    email,
    password,
  });
  return res;
};
