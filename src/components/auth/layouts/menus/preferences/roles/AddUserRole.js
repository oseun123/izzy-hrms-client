import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MiniSpinner from "../../../../../helpers/MiniSpinner";
import { useDispatch } from "react-redux";
import { useShallowEqualSelector } from "../../../../../../hooks";
import {
  spinner_preferences,
  message_preferences,
  status_preferences,
  system_roles,
  system_users,
} from "../../../../../../store/selectors/preferencesSelector";

import {
  useGetSystemRoles,
  useGetSystemUsers,
} from "./../../../../../../store/actions/preferencesHooksActions";
import { useForm } from "../../../../../../hooks";
import { validateAssignUsers } from "../../../../../../util/formValidations";
import { assignUsers } from "../../../../../../store/actions/preferencesActions";
import classnames from "classnames";
import Message from "../../../../../helpers/Message";
import { Select } from "antd";

const { Option } = Select;

function AddUserRole() {
  const [enabled, setEnabled] = useState(true);
  const [all_roles, setAllRoles] = useState([]);
  const [all_users, setAllUsers] = useState([]);

  const dispatch = useDispatch();

  useGetSystemRoles(enabled, setEnabled, "_", "_", "all");
  useGetSystemUsers(enabled, setEnabled);
  const spinner = useShallowEqualSelector(spinner_preferences);
  const status = useShallowEqualSelector(status_preferences);
  const message = useShallowEqualSelector(message_preferences);
  const roles = useShallowEqualSelector(system_roles);
  const users = useShallowEqualSelector(system_users);

  const initValues = {
    role: "",
    users: [],
  };
  // callback
  const assignUsersFromform = () => {
    // alert("here");
    console.log(values);

    assignUsers(dispatch, { role_id: values.role, users: values.users }).then(
      (res) => {
        if (res?.status === "success") {
          clearForm();
        }
      }
    );
  };
  const { values, errors, handleChange, handleSubmit, clearForm } = useForm(
    assignUsersFromform,
    initValues,
    validateAssignUsers
  );
  const handleChangeRole = (role_id) => {
    if (role_id) {
      handleChange("_", true, { name: "role", value: role_id });
      const sel_user_id = [];
      const filtered_user = all_roles.find((role) => {
        return role.id === role_id;
      });
      filtered_user.users.forEach((user) => {
        return sel_user_id.push(user.id);
      });
      handleChange("_", true, { name: "users", value: sel_user_id });
    } else {
      handleChange("_", true, { name: "role", value: "" });
      handleChange("_", true, { name: "users", value: [] });
    }
  };

  const handleChangeUsers = (value) => {
    handleChange("_", true, { name: "users", value: value });
  };

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   console.log({ sel_role, sel_users });
  //   assignUsers(dispatch, { role_id: sel_role, users: sel_users });
  // }

  useEffect(() => {
    setAllRoles(roles);
  }, [roles]);

  useEffect(() => {
    setAllUsers(users);
  }, [users]);

  useEffect(() => {
    return () => {
      dispatch({ type: "CLEAR_PREFERENCES_ERRORS" });
    };
  }, [dispatch]);

  return (
    <>
      <div>
        {/* Content Header (Page header) */}
        <section className="content-header">
          {message && status ? (
            <Message message={message} status={status} />
          ) : null}
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Assign Role</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Prefrences</li>
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content">
          {/* Default box */}
          <form onSubmit={handleSubmit}>
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Add user to a role</h3>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="form-group col-md-4">
                    <label htmlFor="name">
                      Roles <span className="text-danger">*</span>
                    </label>
                    <Select
                      style={{
                        width: "100%",
                      }}
                      showSearch
                      status={errors.role ? "error" : ""}
                      id="role"
                      name="role"
                      allowClear
                      onChange={handleChangeRole}
                      filterOption={(input, option) => {
                        return option.children[1]
                          .toLowerCase()
                          .includes(input.toLowerCase());
                      }}
                      value={values.role}
                    >
                      {all_roles &&
                        all_roles.map((role) => (
                          <Option key={role.id} value={role.id}>
                            {" "}
                            {role.name}
                          </Option>
                        ))}
                    </Select>

                    <div
                      className={classnames(
                        "invalid-feedback",
                        "custom-feedback",
                        {
                          "custom-visibible": errors.role,
                        }
                      )}
                    >
                      {errors.role}
                    </div>
                  </div>
                  <div className="form-group col-md-8">
                    <label htmlFor="users">
                      Users <span className="text-danger">*</span>
                    </label>
                    <Select
                      style={{
                        width: "100%",
                      }}
                      status={errors.users ? "error" : ""}
                      showSearch
                      id="users"
                      name="users"
                      mode="multiple"
                      allowClear
                      value={values.users}
                      onChange={handleChangeUsers}
                      filterOption={(input, option) => {
                        return option.children[1]
                          .toLowerCase()
                          .includes(input.toLowerCase());
                      }}
                    >
                      {all_users &&
                        all_users.map((user) => (
                          <Option key={user.id} value={user.id}>
                            {" "}
                            {user.first_name} {user.last_name}
                          </Option>
                        ))}
                    </Select>

                    <div
                      className={classnames(
                        "invalid-feedback",
                        "custom-feedback",
                        {
                          "custom-visibible": errors.users,
                        }
                      )}
                    >
                      {errors.users}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary d-flex"
                  disabled={spinner}
                >
                  <span className="shift_up">
                    <i className="fas fa-plus-circle"></i> Assign
                    <MiniSpinner color="white" d-hidden spinner={spinner} />
                  </span>
                </button>

                {/* /.card */}
              </div>
            </div>
          </form>
          {/* /.card */}
        </section>
        {/* /.content */}
      </div>
    </>
  );
}

export default AddUserRole;