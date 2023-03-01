import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Table } from "antd";
import { useGetSystemDepartment } from "./../../../../../../store/actions/preferencesHooksActions";
import { preferencesCleanUp } from "../../../../../../store/actions/preferencesActions";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useShallowEqualSelector } from "../../../../../../hooks";
import {
  message_preferences,
  status_preferences,
  single_system_department,
} from "../../../../../../store/selectors/preferencesSelector";

import Message from "../../../../../helpers/Message";
import { capitalizeFirstLetter } from "./../../../../../../util/helpers";
import { department_details_columns } from "./../../../../../../util/tables";
import PreferencesHero from "../PreferencesHero";
import AminatedLayout from "../../../../../ui/AminatedLayout";

function DepartmentDetails() {
  const { id } = useParams();
  const [enabled, setEnabled] = useState(true);

  useGetSystemDepartment(enabled, setEnabled);

  const dispatch = useDispatch();
  const status = useShallowEqualSelector(status_preferences);
  const message = useShallowEqualSelector(message_preferences);
  const single_department = useSelector(
    (state) => single_system_department(state, id),
    shallowEqual
  );

  const users = single_department[0]?.users;
  const department_name = single_department[0]?.name;

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
                <h1>Department Details</h1>
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
                      {department_name &&
                        capitalizeFirstLetter(department_name)}{" "}
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
                      columns={department_details_columns()}
                      rowKey={(record) => record.id}
                      dataSource={users}
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
      </AminatedLayout>
    </>
  );
}

export default DepartmentDetails;
