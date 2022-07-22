import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/reducers/rootReducer";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import {
  privateRequestGet,
  refreshToken,
  privateRequest,
} from "./requestMethods";
import Cookies from "js-cookie";
import { token } from "./config";
import jwt_decode from "jwt-decode";
import { dehashData, hashData } from "./util/hash";

const client = new QueryClient();
ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

privateRequestGet.interceptors.request.use(
  async (config) => {
    const dehash = dehashData();
    let currentDate = new Date();
    const decodedToken = jwt_decode(dehash.token);
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      const res = await refreshToken.get("/api/auth/refresh");
      config.headers["Authorization"] = "Bearer " + res.data.payload.new_token;

      const hash = hashData({ ...dehash, token: res.data.payload.new_token });

      Cookies.set(token, hash);
    }
    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
);
privateRequest.interceptors.request.use(
  async (config) => {
    const dehash = dehashData();
    let currentDate = new Date();
    const decodedToken = jwt_decode(dehash.token);
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      const res = await refreshToken.get("/api/auth/refresh");
      config.headers["Authorization"] = "Bearer " + res.data.payload.new_token;
      const hash = hashData({ ...dehash, token: res.data.payload.new_token });
      Cookies.set(token, hash);
    }
    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

privateRequest.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const err = error.response.data.message;
    if (
      err === "Invalid Session. Kindly login again." ||
      err === "Unauthorized"
    ) {
      Cookies.remove(token);
      store.dispatch({
        type: "LOGOUT_USER",
        payload: {
          message: "Invalid Session. Kindly login again.",
          status: "error",
        },
      });
    }
    return Promise.reject(error);
  }
);
privateRequestGet.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const err = error.response.data.message;
    if (
      err === "Invalid Session. Kindly login again." ||
      err === "Unauthorized"
    ) {
      Cookies.remove(token);
      store.dispatch({
        type: "LOGOUT_USER",
        payload: {
          message: "Invalid Session. Kindly login again.",
          status: "error",
        },
      });
    }
    return Promise.reject(error);
  }
);
