import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Table } from "antd";
import { useGetSystemCompany } from "./../../../../../../store/actions/preferencesHooksActions";
import { preferencesCleanUp } from "../../../../../../store/actions/preferencesActions";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useShallowEqualSelector } from "../../../../../../hooks";
import {
  message_preferences,
  status_preferences,
  single_system_company,
} from "../../../../../../store/selectors/preferencesSelector";

import Message from "../../../../../helpers/Message";
import { capitalizeFirstLetter } from "./../../../../../../util/helpers";
import { company_details_columns } from "./../../../../../../util/tables";
import PreferencesHero from "../PreferencesHero";

function CompanyDetails() {
  const { id } = useParams();
  const [enabled, setEnabled] = useState(true);

  useGetSystemCompany(enabled, setEnabled);

  const dispatch = useDispatch();
  const status = useShallowEqualSelector(status_preferences);
  const message = useShallowEqualSelector(message_preferences);
  const single_company = useSelector(
    (state) => single_system_company(state, id),
    shallowEqual
  );

  const branches = single_company[0]?.branches;
  const company_name = single_company[0]?.name;

  useEffect(() => {
    return () => {
      preferencesCleanUp(dispatch);
    };
  }, [dispatch]);

  return (
    <>
      <PreferencesHero />
      {/* Content Header (Page header) */}
      <section className="content-header">
        {message && status ? (
          <Message message={message} status={status} />
        ) : null}
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Company Details</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="/">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Preferences </li>
              </ol>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              {/* Default box */}
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">
                    Branches in{" "}
                    {company_name && capitalizeFirstLetter(company_name)}{" "}
                  </h3>
                  <div className="card-tools ">
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="collapse"
                      data-toggle="tooltip"
                      title="Collapse"
                    >
                      <i className="fas fa-minus" />
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <Table
                    columns={company_details_columns()}
                    rowKey={(record) => record.id}
                    dataSource={branches}
                    scroll={{
                      x: 786,
                    }}
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
    </>
  );
}

export default CompanyDetails;
