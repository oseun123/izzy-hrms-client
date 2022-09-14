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

privateRequest.interceptors.response.use(
  function (response) {
    return response;
  },
  async (error) => {
    const prevRequest = error?.config;
    const err = error.response.data.message;
    const dehash = dehashData();
    if (
      err === "Invalid Session. Kindly login again." ||
      (err === "Unauthorized" && !prevRequest?.sent)
    ) {
      prevRequest.sent = true;
      const res = await refreshToken.get("/api/auth/refresh");
      prevRequest.headers["Authorization"] =
        "Bearer " + res.data.payload.new_token;
      const hash = hashData({ ...dehash, token: res.data.payload.new_token });
      Cookies.set(token, hash);

      return privateRequest(prevRequest);
    }

    return Promise.reject(error);
  }
);
privateRequestGet.interceptors.response.use(
  function (response) {
    return response;
  },
  async (error) => {
    const prevRequest = error?.config;
    const err = error.response.data.message;
    const dehash = dehashData();
    if (
      err === "Invalid Session. Kindly login again." ||
      (err === "Unauthorized" && !prevRequest?.sent)
    ) {
      prevRequest.sent = true;
      const res = await refreshToken.get("/api/auth/refresh");
      prevRequest.headers["Authorization"] =
        "Bearer " + res.data.payload.new_token;
      const hash = hashData({ ...dehash, token: res.data.payload.new_token });
      Cookies.set(token, hash);

      return privateRequestGet(prevRequest);
    }

    return Promise.reject(error);
  }
);
