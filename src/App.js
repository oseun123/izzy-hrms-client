import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import Layout from "./components/auth/Layout";
import ForgetPassword from "./components/guest/ForgetPassword";
import Login from "./components/guest/Login";
import ResetPassword from "./components/guest/ResetPassword";
import RequireAuth from "./hoc/RequireAuth";
import AlreadyAuth from "./hoc/AlreadyAuth";
import {
  privateRequestGet,
  refreshToken,
  privateRequest,
} from "./requestMethods";
import Cookies from "js-cookie";
import { token } from "./config";
import jwt_decode from "jwt-decode";
import { dehashData, hashData } from "./util/hash";


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <AlreadyAuth
          exact
          path="/reset-password/:token"
          component={ResetPassword}
        />

        <AlreadyAuth exact path="/forget-password" component={ForgetPassword} />

        <AlreadyAuth exact path="/login" component={Login} />

        <RequireAuth path="/" component={Layout} />
      </Switch>
    </BrowserRouter>
  );
}

privateRequestGet.interceptors.request.use(
  async (config) => {
    const dehash = dehashData;
    let currentDate = new Date();
    const decodedToken = jwt_decode(dehash.token);
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      const res = await refreshToken.get("/api/auth/refresh");
      config.headers["Authorization"] = "Bearer " + res.data.payload.new_token;
      const hash = hashData(res.data.payload.new_token);
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
      const hash = hashData(res.data.payload.new_token);
      Cookies.set(token, hash);
    }
    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

export default App;
