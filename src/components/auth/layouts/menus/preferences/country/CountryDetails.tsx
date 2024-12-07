import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Table } from "antd";
import { useGetSystemCountry } from "./../../../../../../store/actions/preferencesHooksActionsType";


import { shallowEqual, useSelector } from "react-redux";

import {

  single_system_country,
} from "../../../../../../store/selectors/preferencesSelector";


import { capitalizeFirstLetter } from "./../../../../../../util/helpers";
import { department_details_columns } from "./../../../../../../util/tables";
import PreferencesHero from "../PreferencesHero";
import AminatedLayout from "../../../../../ui/AminatedLayout";
import NoCustomDataIcon from "../../../../../ui/NoCustomDataIcon";
import { useCleanUp } from "../../../../../../hooks";
import { GoGlobe } from "react-icons/go";
import GeneralBackButton from "../../../../../ui/GeneralBackButton";

function CountryDetails() {
  useCleanUp()
  const { id } = useParams();
  const [enabled, setEnabled] = useState(true);

  useGetSystemCountry(enabled, setEnabled,'all');


  
  const single_country = useSelector(
     // @ts-ignore
    (state) => single_system_country(state, id),
    shallowEqual
  );

  const users = single_country[0]?.users;
  const country_name = single_country[0]?.name;



  return (
    <>
      <PreferencesHero />
      <AminatedLayout>
        {/* Content Header (Page header) */}
        <section className="content-header">
        
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Country Details</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Preferences </li>
                  <li className="breadcrumb-item active">Country </li>
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content col-md-12">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                {/* Default box */}
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">
                      <span className="space__align">

                      <GoGlobe/>
                      User(s) in{" "}
                      {country_name && capitalizeFirstLetter(country_name)}{" "}
                      </span>
                    </h3>
                    <div className="card-tools ">
                      <GeneralBackButton/>
                    </div>
                  </div>
                  <div className="card-body">
                    <Table
                     // @ts-ignore
                      columns={department_details_columns()}
                      rowKey={(record) => record.id}
                      dataSource={users}
                      scroll={{
                        x: 786,
                      }}
                      locale={{ emptyText: <NoCustomDataIcon /> }}
                    />
                  </div>
                  {/* /.card-body */}

                  {/* /.card-footer*/}
                </div>
                {/* /.card */}
              </div>
            </div>
          </div>
        </section>
        {/* /.content */}
      </AminatedLayout>
    </>
  );
}

export default CountryDetails;
