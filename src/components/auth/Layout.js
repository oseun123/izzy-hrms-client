import React, { Suspense } from "react";
import Spinner from "../helpers/Spinner";
import Header from "./layouts/header/Header";
import Aside from "./layouts/aside/Aside";
import Footer from "./layouts/footer/Footer";
import NoMatch from "./layouts/menus/NoMatch";
import HasPermission from "../../hoc/HasPermission";
import { Switch, Route, useLocation } from "react-router-dom";

import styles from "../styles/layout/Layout.module.css";

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
  CreateGenders,
  ViewGenders,
  GenderDetails,
  EditGenders,
  CreateStates,
  ViewStates,
  StateDetails,
  CreateCountry,
  ViewCountry,
  EditStates,
  EditCountry,
  CountryDetails,
  CreateCompany,
  ViewCompanys,
  EditCompany,
  CompanyDetails,
  CreateBranch,
  ViewBranch,
  BranchDetails,
  EditBranch,
  DisplaySettings,
} from "./layouts/preferences";

// Human Resource Component
import { CreateEmployee } from "./layouts/human_resource";

// dashboard components

import { PersonalDashboard } from "./layouts/dashboard";
import { AnimatePresence } from "framer-motion";

const Layout = () => {
  const location = useLocation();
  return (
    <Suspense
      fallback={
        <div className={styles.spinner_box}>
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
            <AnimatePresence exitBeforeEnter>
              <Switch location={location} key={location.pathname}>
                {/* dashboard */}
                <Route
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
                  permission="EDIT_ROLES"
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
                  permission="EDIT_DEPARTMENT"
                />

                <HasPermission
                  exact
                  path="/preferences/view-departments/:id"
                  component={DepartmentDetails}
                  permission="VIEW_DEPARTMENT"
                />
                {/* end department */}

                {/* start gender */}
                <HasPermission
                  exact
                  path="/preferences/create-genders"
                  component={CreateGenders}
                  permission="CREATE_GENDER"
                />

                <HasPermission
                  exact
                  path="/preferences/view-genders"
                  component={ViewGenders}
                  permission="VIEW_GENDER"
                />
                <HasPermission
                  exact
                  path="/preferences/view-genders/:id"
                  component={GenderDetails}
                  permission="VIEW_GENDER"
                />
                <HasPermission
                  exact
                  path="/preferences/edit-genders/:id"
                  component={EditGenders}
                  permission="EDIT_GENDER"
                />

                {/* end gender */}

                {/* start state */}
                <HasPermission
                  exact
                  path="/preferences/create-states"
                  component={CreateStates}
                  permission="CREATE_STATES"
                />
                <HasPermission
                  exact
                  path="/preferences/view-states"
                  component={ViewStates}
                  permission="VIEW_STATES"
                />

                <HasPermission
                  exact
                  path="/preferences/view-states/:id"
                  component={StateDetails}
                  permission="VIEW_STATES"
                />
                <HasPermission
                  exact
                  path="/preferences/edit-states/:id"
                  component={EditStates}
                  permission="EDIT_STATES"
                />
                {/* end state */}

                {/* start country */}
                <HasPermission
                  exact
                  path="/preferences/create-countries"
                  component={CreateCountry}
                  permission="CREATE_COUNTRY"
                />
                <HasPermission
                  exact
                  path="/preferences/view-countries"
                  component={ViewCountry}
                  permission="VIEW_COUNTRY"
                />
                <HasPermission
                  exact
                  path="/preferences/view-countries/:id"
                  component={CountryDetails}
                  permission="VIEW_COUNTRY"
                />
                <HasPermission
                  exact
                  path="/preferences/edit-countries/:id"
                  component={EditCountry}
                  permission="EDIT_COUNTRY"
                />

                {/* end country */}

                {/* start company */}
                <HasPermission
                  exact
                  path="/preferences/create-companies"
                  component={CreateCompany}
                  permission="CREATE_COMPANY"
                />
                <HasPermission
                  exact
                  path="/preferences/view-companies"
                  component={ViewCompanys}
                  permission="VIEW_COMPANY"
                />
                <HasPermission
                  exact
                  path="/preferences/edit-companies/:id"
                  component={EditCompany}
                  permission="EDIT_COMPANY"
                />
                <HasPermission
                  exact
                  path="/preferences/view-companies/:id"
                  component={CompanyDetails}
                  permission="VIEW_COMPANY"
                />

                {/* end company */}

                {/* start branch */}
                <HasPermission
                  exact
                  path="/preferences/create-branches"
                  component={CreateBranch}
                  permission="CREATE_BRANCH"
                />
                <HasPermission
                  exact
                  path="/preferences/view-branches"
                  component={ViewBranch}
                  permission="VIEW_BRANCH"
                />
                <HasPermission
                  exact
                  path="/preferences/view-branches/:id"
                  component={BranchDetails}
                  permission="VIEW_BRANCH"
                />

                <HasPermission
                  exact
                  path="/preferences/edit-branches/:id"
                  component={EditBranch}
                  permission="EDIT_BRANCH"
                />

                {/* end branch */}

                {/* start setting */}

                <HasPermission
                  exact
                  path="/preferences/display-settings"
                  component={DisplaySettings}
                  permission="SET_DISPLAY"
                />

                {/* end setting */}

                {/* start onboarding*/}
                <HasPermission
                  exact
                  path="/human-resource/create-employee"
                  component={CreateEmployee}
                  permission="CREATE_EMPLOYEE"
                />

                {/* end onboarding */}

                <Route path="*" component={NoMatch} />
              </Switch>
            </AnimatePresence>
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
