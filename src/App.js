import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import Layout from "./components/auth/Layout";
import ForgetPassword from "./components/guest/ForgetPassword";
import Login from "./components/guest/Login";
import ResetPassword from "./components/guest/ResetPassword";
import RequireAuth from "./hoc/RequireAuth";
import AlreadyAuth from "./hoc/AlreadyAuth";
import "antd/dist/reset.css";
import Spinner from "./components/helpers/Spinner";
import { UseGetCurrentClient } from "../src/store/actions/userHooksActions";

import styles from "./components/styles/layout/Layout.module.css";
import "./index.css";

function App() {
  const [isloaded, setIsloaded] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const { data, error } = UseGetCurrentClient(enabled, setEnabled);

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
    <div className={styles.spinner_box}>
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
