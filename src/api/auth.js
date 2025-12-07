import API from "./axios";

export const loginUser = (email, password) =>
  API.post("/users/login", { email, password });

export const registerUser = (name, email, password) =>
  API.post("/users/register", { name, email, password });
