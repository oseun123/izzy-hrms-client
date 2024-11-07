import React, { useState } from "react";
import { Link } from "react-router-dom";

import PreferencesHero from "../PreferencesHero";
import AminatedLayout from "../../../../../ui/AminatedLayout";
import NavBarVariant from "./NavBarVariant";
import {
  // current_cleint,
  message,
  status,
} from "../../../../../../store/selectors/userSelectors";
import Message from "../../../../../helpers/Message";
import { useShallowEqualSelector } from "../../../../../../hooks";
import DarkSideBarVariant from "./DarkSideBarVariant";
import { useGetCurrentClient } from "./../../../../../../store/actions/userHooksActions";
import LightSideBarVariant from "./LightSidebarVariant";

import { useCleanUp } from "../../../../../../hooks";
import BranLogo from "./BrandLogo";
function DisplaySettings() {
  useCleanUp();
  const [enabled, setEnabled] = useState(true);
  const userMessage = useShallowEqualSelector(message);
  const userStatus = useShallowEqualSelector(status);
  // const currentCleint = useShallowEqualSelector(current_cleint);
  const { data } = useGetCurrentClient(enabled, setEnabled);

  const currentCleint = data?.payload?.current_cleint;

  return (
    <>
      <PreferencesHero />
      <AminatedLayout>
        {/* Content Header (Page header) */}
        <section className="content-header">
          {userMessage && userStatus ? (
            <Message message={userMessage} status={userStatus} />
          ) : null}
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
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>

        <div className="row m-0">
          <NavBarVariant
            currentCleint={currentCleint}
            setEnabled={setEnabled}
          />
          <DarkSideBarVariant
            currentCleint={currentCleint}
            setEnabled={setEnabled}
          />
        </div>

        {/* /.content */}
        {/* Main content */}

        <div className="row m-0">
          <LightSideBarVariant
            currentCleint={currentCleint}
            setEnabled={setEnabled}
          />

          <BranLogo currentCleint={currentCleint} setEnabled={setEnabled} />
        </div>

        {/* /.content */}
      </AminatedLayout>
    </>
  );
}

export default DisplaySettings;
