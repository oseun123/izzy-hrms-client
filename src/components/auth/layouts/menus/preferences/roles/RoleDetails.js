import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Table } from "antd";
import {
  useGetSystemRoles,
  useGetUserPermissions,
} from "./../../../../../../store/actions/preferencesHooksActions";
import {
  removeUser,
  preferencesCleanUp,
} from "../../../../../../store/actions/preferencesActions";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  useShallowEqualSelector,
  useAxiosPrivate,
} from "../../../../../../hooks";
import {
  message_preferences,
  status_preferences,
  single_system_role,
} from "../../../../../../store/selectors/preferencesSelector";

import { currentUser } from "../../../../../../store/selectors/userSelectors";
import Message from "../../../../../helpers/Message";
import {
  capitalizeFirstLetter,
  filtered_permissions,
} from "./../../../../../../util/helpers";
import { role_details_columns } from "./../../../../../../util/tables";
import Permissions from "./Permissions";

import PreferencesHero from "../PreferencesHero";

const confirm_text = "Are you sure you want to remove this user?";

function RoleDetails() {
  const auth_user = useShallowEqualSelector(currentUser);
  const { id } = useParams();
  const [enabledRole, setEnabledRole] = useState(true);
  const [enabledUserPerm, setEnabledUserPerm] = useState(false);

  useGetSystemRoles(enabledRole, setEnabledRole);
  useGetUserPermissions(enabledUserPerm, setEnabledUserPerm, auth_user.id);
  const request = useAxiosPrivate();
  const dispatch = useDispatch();
  const status = useShallowEqualSelector(status_preferences);
  const message = useShallowEqualSelector(message_preferences);
  const single_role = useSelector(
    (state) => single_system_role(state, id),
    shallowEqual
  );

  const users = single_role[0]?.users;
  const role_name = single_role[0]?.name;
  const default_role = single_role[0]?.default;
  const permissions = single_role[0]?.permissions;
  const filtered_perm = filtered_permissions(permissions);

  function toremoveUser(user_id) {
    const creds = { user: user_id, role_id: id };
    removeUser(dispatch, request, creds).then((res) => {
      if (res.status === "success") {
        setEnabledRole(true);
        setEnabledUserPerm(true);
      }
    });
  }

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
              <h1>Role Details</h1>
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
                    User(s) in {role_name && capitalizeFirstLetter(role_name)}{" "}
                    {default_role ? (
                      <span className="font-italic font-weight-light">
                        (Default role)
                      </span>
                    ) : null}
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
                    columns={role_details_columns(confirm_text, toremoveUser)}
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
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              {/* Default box */}
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">
                    Permission(s) in{" "}
                    {role_name && capitalizeFirstLetter(role_name)}{" "}
                    {default_role ? (
                      <span className="font-italic font-weight-light">
                        (Default role)
                      </span>
                    ) : null}
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
                  {filtered_perm &&
                    Object.keys(filtered_perm).map((permission, index) => {
                      return (
                        <Permissions
                          index={index}
                          key={permission}
                          permission={permission}
                          all_permissions={filtered_perm}
                          readonly={true}
                        />
                      );
                    })}
                </div>
                {/* /.card-body */}

                {/* /.card-footer*/}
              </div>
              {/* /.card */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default RoleDetails;
