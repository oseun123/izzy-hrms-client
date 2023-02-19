import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Table } from "antd";
import { useGetSystemBranch } from "./../../../../../../store/actions/preferencesHooksActions";
import { preferencesCleanUp } from "../../../../../../store/actions/preferencesActions";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useShallowEqualSelector } from "../../../../../../hooks";
import {
  message_preferences,
  status_preferences,
  single_system_branch,
} from "../../../../../../store/selectors/preferencesSelector";

import Message from "../../../../../helpers/Message";
import { capitalizeFirstLetter } from "./../../../../../../util/helpers";
import { department_details_columns } from "./../../../../../../util/tables";
import PreferencesHero from "../PreferencesHero";

function BranchDetails() {
  const { id } = useParams();
  const [enabled, setEnabled] = useState(true);

  useGetSystemBranch(enabled, setEnabled);

  const dispatch = useDispatch();
  const status = useShallowEqualSelector(status_preferences);
  const message = useShallowEqualSelector(message_preferences);
  const single_branch = useSelector(
    (state) => single_system_branch(state, id),
    shallowEqual
  );

  const users = single_branch[0]?.users;
  const managers = single_branch[0]?.managers;
  const branch_name = single_branch[0]?.name;

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
              <h1>Branch Details</h1>
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
                    Users in {branch_name && capitalizeFirstLetter(branch_name)}{" "}
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
          <div className="row">
            <div className="col-12">
              {/* Default box */}
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">
                    Manager in{" "}
                    {branch_name && capitalizeFirstLetter(branch_name)}{" "}
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
                    dataSource={managers}
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
          <div className="row">
            <div className="col-12">
              {/* Default box */}
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">More Details</h3>
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
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Field</th>
                        <th scope="col">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>Name</td>
                        <td>{single_branch[0].name || "--"}</td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>Address</td>
                        <td>{single_branch[0].address || "--"}</td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td>Email</td>
                        <td>{single_branch[0].email || "--"}</td>
                      </tr>
                      <tr>
                        <th scope="row">4</th>
                        <td>Phone 1</td>
                        <td>{single_branch[0].phone_1 || "--"}</td>
                      </tr>
                      <tr>
                        <th scope="row">5</th>
                        <td>Phone 2</td>
                        <td>{single_branch[0].phone_2 || "--"}</td>
                      </tr>
                      <tr>
                        <th scope="row">6</th>
                        <td>Company</td>
                        <td>{single_branch[0].company.name || "--"}</td>
                      </tr>
                      <tr>
                        <th scope="row">7</th>
                        <td>Code</td>
                        <td>{single_branch[0].code || "--"}</td>
                      </tr>
                    </tbody>
                  </table>
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

export default BranchDetails;
