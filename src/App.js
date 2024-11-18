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
import { useGetCurrentClient } from "../src/store/actions/userHooksActions";

import styles from "./components/styles/layout/Layout.module.css";
import "./index.css";

function App() {
  const [isloaded, setIsloaded] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const { data, error, refetch } = useGetCurrentClient(enabled, setEnabled);
  const navbar_light_skins = [
    { class: "sidebar-light-primary", color: "#007bff" },
    { class: "sidebar-light-info", color: "#17a2b8" },
    { class: "sidebar-light-success", color: "#28a745" },
    { class: "sidebar-light-danger", color: "#dc3545" },
    { class: "sidebar-light-indigo", color: "#6610f2" },
    { class: "sidebar-light-purple", color: "#6f42c1" },
    { class: "sidebar-light-pink", color: "#e83e8c" },
    { class: "sidebar-light-navy", color: "#001f3d" },
    { class: "sidebar-light-lightblue", color: "#17a2b8" },
    { class: "sidebar-light-teal", color: "#20c997" },
    { class: "sidebar-light-warning", color: "#ffc107" },
    { class: "sidebar-light-orange", color: "#fd7e14" },
    { class: "sidebar-light-fuchsia", color: "#d63384" },
    { class: "sidebar-light-maroon", color: "#d81b60" },
    { class: "sidebar-light-lime", color: "#01ff70" },
    { class: "sidebar-light-olive", color: "#3d9970" },
    { class: "sidebar-light-secondary", color: "#6c757d" },
  ];

  const navbar_dark_skins = [
    { class: "sidebar-dark-primary", color: "#343a40" },
    { class: "sidebar-dark-info", color: "#17a2b8" },
    { class: "sidebar-dark-success", color: "#28a745" },
    { class: "sidebar-dark-danger", color: "#dc3545" },
    { class: "sidebar-dark-indigo", color: "#6610f2" },
    { class: "sidebar-dark-purple", color: "#6f42c1" },
    { class: "sidebar-dark-pink", color: "#e83e8c" },
    { class: "sidebar-dark-navy", color: "#001f3d" },
    { class: "sidebar-dark-lightblue", color: "#17a2b8" },
    { class: "sidebar-dark-teal", color: "#20c997" },
    { class: "sidebar-dark-warning", color: "#ffc107" },
    { class: "sidebar-dark-orange", color: "#fd7e14" },
    { class: "sidebar-dark-fuchsia", color: "#d63384" },
    { class: "sidebar-dark-maroon", color: "#d81b60" },
    { class: "sidebar-dark-lime", color: "#01ff70" },
    { class: "sidebar-dark-olive", color: "#3d9970" },
    { class: "sidebar-dark-secondary", color: "#6c757d" },
  ];

  useEffect(() => {
    if (data && Object.keys(data).length) {
      setIsloaded(true);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      window.location.replace(process.env.REACT_APP_HOST);
    }
  }, [error]);

  useEffect(() => {
    if (data && Object.keys(data).length) {
      const settings = data?.payload?.current_cleint?.settings;
      const settings_array = JSON.parse(settings)[0];
      const sidebar_variant = settings_array?.display?.sidebar_variant;

      // Find the corresponding color
      const findColor = (variant) => {
        const allSkins = [...navbar_light_skins, ...navbar_dark_skins];
        const skin = allSkins.find(
          (skin) => skin.class.trim() === variant.trim()
        );
        return skin ? skin.color : null;
      };

      const color = findColor(sidebar_variant);
      if (color) {
        // Set the color in the CSS root variable
        document.documentElement.style.setProperty("--primary", color);
        console.log(`CSS variable --primary set to: ${color}`);
      } else {
        console.warn(`Sidebar variant "${sidebar_variant}" not found.`);
      }
    }
  }, [data]);
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
