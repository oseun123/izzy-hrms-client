import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Skeleton, Table } from "antd";
import { useGetSystemDesignation } from "./../../../../../../store/actions/preferencesHooksActions";
import { preferencesCleanUp } from "../../../../../../store/actions/preferencesActions";

import { useDispatch } from "react-redux";
import { useShallowEqualSelector } from "../../../../../../hooks";
import {
  message_preferences,
  status_preferences,
} from "../../../../../../store/selectors/preferencesSelector";

import Message from "../../../../../helpers/Message";
import { capitalizeFirstLetter } from "./../../../../../../util/helpers";
import { department_details_columns } from "./../../../../../../util/tables";
import PreferencesHero from "../PreferencesHero";
import AminatedLayout from "../../../../../ui/AminatedLayout";
import NoCustomDataIcon from "../../../../../ui/NoCustomDataIcon";

function DesignationDetails() {
  const { id } = useParams();
  const [enabled, setEnabled] = useState(true);
  const [single_designation, setSingleDesignation] = useState(null);

  const { isLoading, data } = useGetSystemDesignation(enabled, setEnabled);

  const dispatch = useDispatch();
  const status = useShallowEqualSelector(status_preferences);
  const message = useShallowEqualSelector(message_preferences);

  useEffect(() => {
    if (data && Object.keys(data).length) {
      const designations = data?.payload?.designations;
      const single_des = designations.find(
        (item) => parseInt(item.id) === parseInt(id)
      );

      setSingleDesignation(single_des);
    }
  }, [data]);

  useEffect(() => {
    return () => {
      preferencesCleanUp(dispatch);
    };
  }, [dispatch]);

  return (
    <>
      <PreferencesHero />
      <AminatedLayout>
        {/* Content Header (Page header) */}
        <section className="content-header">
          {message && status ? (
            <Message message={message} status={status} />
          ) : null}
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Designation Details</h1>
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
                      User(s) in{" "}
                      {single_designation &&
                        capitalizeFirstLetter(single_designation?.name)}{" "}
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
                    {isLoading ? (
                      <Skeleton active />
                    ) : (
                      <Table
                        columns={department_details_columns()}
                        rowKey={(record) => record.id}
                        dataSource={single_designation?.users}
                        scroll={{
                          x: 786,
                        }}
                        locale={{ emptyText: <NoCustomDataIcon /> }}
                      />
                    )}
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

export default DesignationDetails;
