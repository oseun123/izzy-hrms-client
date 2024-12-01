import React, { useState } from "react";
import { Link } from "react-router-dom";

import PreferencesHero from "../PreferencesHero";
import AminatedLayout from "../../../../../ui/AminatedLayout";

import { useCleanUp } from "../../../../../../hooks";
import DarkSideBarVariant from "./DarkSideBarVariant";
// import { useGetCurrentClient } from "../../../../../../store/actions/userHooksActionsType";
import LightSideBarVariant from "./LightSidebarVariant";
// import { ApiResponse } from "../../../../../../@types/api.types";
import { useGetCurrentClient } from "../../../../../../store/actions/userHooksActionsType";
import { CurrentClient } from "../../../../../../@types/api.types";



const DisplaySettings: React.FC = () =>  {
  
  useCleanUp();

  const [enabled, setEnabled] = useState<boolean>(true);



  // const currentCleint = useShallowEqualSelector(current_cleint);
  const { data } = useGetCurrentClient(enabled, setEnabled)
;



  const current: CurrentClient = data!.payload!.current_cleint!;

  console.log({data, current});

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
            currentCleint={current}
            setEnabled={setEnabled}
          />

          <DarkSideBarVariant
            currentCleint={current}
            setEnabled={setEnabled}
          />
        </div>
      </AminatedLayout>
    </>
  );
}

export default DisplaySettings;
