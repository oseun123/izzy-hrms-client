import React from "react";
import { Link } from "react-router-dom";

import PreferencesHero from "../../PreferencesHero";
import AminatedLayout from "../../../../../../ui/AminatedLayout";
import {
  useCleanUp,
  usePreferenceNotification,
} from "../../../../../../../hooks";
import EmployeeNumber from "./EmployeeNumber";

function GeneralSettings() {
  useCleanUp();
  usePreferenceNotification();
  return (
    <>
      <PreferencesHero />
      <AminatedLayout>
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>General Settings</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Preferences</li>
                  <li className="breadcrumb-item active">Settings</li>
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>

        <div className="row m-0">
          <EmployeeNumber />
        </div>

        {/* /.content */}
        {/* Main content */}

        <div className="row m-0"></div>

        {/* /.content */}
      </AminatedLayout>
    </>
  );
}

export default GeneralSettings;
