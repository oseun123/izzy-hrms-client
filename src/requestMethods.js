import { BASE_URL, token } from "./config";
import axios from "axios";
import { dehashData } from "./util/hash";
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
export const setPrivateRequest = () => {
  const dehash = dehashData(token);
  privateRequest.defaults.headers.common["Authorization"] = `Bearer ${dehash}`;
  return privateRequest;
};
export const setPrivateRequestGet = () => {
  const dehash = dehashData(token);
  privateRequestGet.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${dehash?.token}`;
  return privateRequestGet;
};
