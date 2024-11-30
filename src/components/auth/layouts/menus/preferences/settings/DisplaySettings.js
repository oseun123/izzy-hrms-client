import React, { useState } from "react";
import { Link } from "react-router-dom";

import PreferencesHero from "../PreferencesHero";
import AminatedLayout from "../../../../../ui/AminatedLayout";

import { useCleanUp } from "../../../../../../hooks";
import DarkSideBarVariant from "./DarkSideBarVariant";
import { useGetCurrentClient } from "./../../../../../../store/actions/userHooksActions";
import LightSideBarVariant from "./LightSidebarVariant";


function DisplaySettings() {
  
  useCleanUp();

  const [enabled, setEnabled] = useState(true);
 
  // const currentCleint = useShallowEqualSelector(current_cleint);
  const { data } = useGetCurrentClient(enabled, setEnabled);

  const currentCleint = data?.payload?.current_cleint;

  return (
    <>
      <PreferencesHero />
      <AminatedLayout>
        {/* Content Header (Page header) */}
        <section className="content-header">
        
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Display settings</h1>
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
          <LightSideBarVariant
            currentCleint={currentCleint}
            setEnabled={setEnabled}
          />

          <DarkSideBarVariant
            currentCleint={currentCleint}
            setEnabled={setEnabled}
          />
        </div>
      </AminatedLayout>
    </>
  );
}

export default DisplaySettings;
