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
import {
  CreateRoles,
  ViewRoles,
  RoleDetails,
  EditRoles,
  AddUserRole,
  ViewDepartments,
  EditDepartments,
  CreateDepartments,
  DepartmentDetails,
} from "./layouts/preferences";

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
              {/* dashboard */}
              <HasPermission
                exact
                path="/"
                component={PersonalDashboard}
                permission="PERSONAL_DASHBOARD"
              />
              {/* end dashboard */}

              {/* roles */}
              <HasPermission
                exact
                path="/preferences/create-roles"
                component={CreateRoles}
                permission="CREATE_ROLES"
              />
              <HasPermission
                exact
                path="/preferences/edit-roles/:id"
                component={EditRoles}
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

              <HasPermission
                exact
                path="/preferences/assign-roles"
                component={AddUserRole}
                permission="ASSIGN_ROLES"
              />
              {/* end roles */}

              {/* department */}
              <HasPermission
                exact
                path="/preferences/create-departments"
                component={CreateDepartments}
                permission="CREATE_DEPARTMENT"
              />
              <HasPermission
                exact
                path="/preferences/view-departments"
                component={ViewDepartments}
                permission="VIEW_DEPARTMENT"
              />
              <HasPermission
                exact
                path="/preferences/edit-departments/:id"
                component={EditDepartments}
                permission="CREATE_DEPARTMENT"
              />

              <HasPermission
                exact
                path="/preferences/view-departments/:id"
                component={DepartmentDetails}
                permission="VIEW_DEPARTMENT"
              />
              {/* end department */}
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
