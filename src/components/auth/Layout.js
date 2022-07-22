import React from "react";
import Header from "./layouts/header/Header";
import Aside from "./layouts/aside/Aside";
import Footer from "./layouts/footer/Footer";
import { Switch, Route } from "react-router-dom";
import PersonalDashboard from "./layouts/menus/dashboard/PersonalDashboard";
import NoMatch from "./layouts/menus/NoMatch";
import HasPermission from "../../hoc/HasPermission";

const Layout = () => {
  return (
    <div className=" hold-transition sidebar-mini layout-fixed text-sm">
      {/* Site wrapper */}
      <div className="wrapper">
        <Header />
        <Aside />
        <div className="content-wrapper">
          <Switch>
            <HasPermission
              exact
              path="/"
              component={PersonalDashboard}
              permission="PERSONAL DASHBOARD"
            />
            <HasPermission
              path="*"
              component={NoMatch}
              permission="PERSONAL DAS"
            />
          </Switch>
        </div>
        {/* /.content-wrapper */}

        <Footer />
      </div>
      {/* ./wrapper */}
    </div>
  );
};

export default Layout;
