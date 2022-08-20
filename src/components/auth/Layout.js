import React, { lazy, Suspense } from "react";
import Spinner from "../helpers/Spinner";
import Header from "./layouts/header/Header";
import Aside from "./layouts/aside/Aside";
import NoMatch from "./layouts/menus/NoMatch";
import HasPermission from "../../hoc/HasPermission";
import { Switch, Route } from "react-router-dom";
// dashboard components
import { PersonalDashboard } from "./layouts/dashboard";
//  preferences component
import { CreateRoles, ViewRoles, RoleDetails } from "./layouts/preferences";
const Footer = lazy(() => import("./layouts/footer/Footer"));
const Layout = () => {
  return (
    <Suspense
      fallback={
        <div style={{ padding: "200px" }}>
          <Spinner position="center" size="large" color="secondary" />
        </div>
      }
    >
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
                permission="PERSONAL_DASHBOARD"
              />
              <HasPermission
                exact
                path="/preferences/create-roles"
                component={CreateRoles}
                permission="CREATE_ROLES"
              />
              <HasPermission
                exact
                path="/preferences/view-roles"
                component={ViewRoles}
                permission="VIEW_ROLES"
              />
              <HasPermission
                exact
                path="/preferences/view-roles/:id"
                component={RoleDetails}
                permission="VIEW_ROLES"
              />

              <Route path="*" component={NoMatch} />
            </Switch>
          </div>
          {/* /.content-wrapper */}

          <Footer />
        </div>
        {/* ./wrapper */}
      </div>
    </Suspense>
  );
};

export default Layout;
