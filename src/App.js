import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import Layout from "./components/auth/Layout";
import ForgetPassword from "./components/guest/ForgetPassword";
import Login from "./components/guest/Login";
import ResetPassword from "./components/guest/ResetPassword";
import RequireAuth from "./hoc/RequireAuth";
import AlreadyAuth from "./hoc/AlreadyAuth";
import "antd/dist/antd.css";
import Spinner from "./components/helpers/Spinner";
import { getAppSubdomain } from "../src/util/helpers";
import { UseGetCurrentClient } from "../src/store/actions/userHooksActions";

function App() {
  const [isloaded, setIsloaded] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [client, setClient] = useState("");
  const { data, error } = UseGetCurrentClient(enabled, setEnabled, client);

  useEffect(() => {
    const is_subdomain = getAppSubdomain();
    if (is_subdomain) {
      setClient(is_subdomain);
      setEnabled(true);
    } else {
      setIsloaded(true);
    }
  }, []);

  useEffect(() => {
    if (data) {
      setIsloaded(true);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      window.location.replace(process.env.REACT_APP_HOST);
    }
  }, [error]);

  const is_loaded = (
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

  const loading = (
    <div style={{ padding: "200px" }}>
      <Spinner position="center" size="large" color="secondary" />
    </div>
  );
  if (isloaded) {
    return is_loaded;
  } else {
    return loading;
  }
}

export default App;
