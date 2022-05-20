import { BASE_URL } from "./config";
import axios from "axios";

export const refreshToken = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const publicRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
export const publicRequestGET = axios.create({
  baseURL: BASE_URL,
});

export const privateRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const privateRequestGet = axios.create({
  baseURL: BASE_URL,
  headers: {},
  withCredentials: true,
});
