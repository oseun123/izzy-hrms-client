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

function App() {
  const [isloaded, SetIsloaded] = useState(false);

  useEffect(() => {
    const time = setTimeout(() => {
      SetIsloaded(true);
    }, 5000);
    return () => {
      clearTimeout(time);
    };
  }, []);

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
