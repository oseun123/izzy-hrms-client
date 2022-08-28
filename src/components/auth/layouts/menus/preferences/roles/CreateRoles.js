import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MiniSpinner from "../../../../../helpers/MiniSpinner";
import { useDispatch } from "react-redux";
import { useShallowEqualSelector } from "../../../../../../hooks";
import {
  spinner_preferences,
  message_preferences,
  status_preferences,
  system_permissions,
} from "../../../../../../store/selectors/preferencesSelector";
import Permissions from "./Permissions";
import { useGetSystemPermissions } from "./../../../../../../store/actions/preferencesHooksActions";
import { useForm } from "../../../../../../hooks";
import { validateCreateRole } from "../../../../../../util/formValidations";
import { createRole } from "../../../../../../store/actions/preferencesActions";
import classnames from "classnames";
import Message from "../../../../../helpers/Message";
import { Input } from 'antd';

function CreateRoles() {
  const [enabled, setEnabled] = useState(true);
  const dispatch = useDispatch();
  useGetSystemPermissions(enabled, setEnabled);
  const spinner = useShallowEqualSelector(spinner_preferences);
  const status = useShallowEqualSelector(status_preferences);
  const message = useShallowEqualSelector(message_preferences);
  const all_system_permissions = useShallowEqualSelector(system_permissions);

  const initRoles = {
    name: "",
    default: false,
    permissions: [],
  };
  // callback
  const createRolesFromform = () => {
    createRole(dispatch, values).then((res) => {
      if (res?.status === "success") {
        clearForm();
        document.querySelector("#default").checked = false;
        document.querySelectorAll(".perm-role").forEach((checkbox) => {
          checkbox.checked = false;
        });
        document.querySelectorAll(".form-check-input").forEach((checkbox) => {
          checkbox.checked = false;
        });
      }
    });
  };
  const { values, errors, handleChange, handleSubmit, clearForm } = useForm(
    createRolesFromform,
    initRoles,
    validateCreateRole
  );

  function handleSubmitfist(e) {
    e.preventDefault();
    const ids = [];
    document.querySelectorAll(".perm-role").forEach((checkbox) => {
      if (checkbox.checked) {
        ids.push(parseInt(checkbox.value));
      }
    });

    values.permissions = [...ids];
    values.default = document.querySelector("#default").checked;
    handleSubmit();
  }

  function handleCheckChange(e) {
    const is_checked = e.target.checked;
    const permissions = document.querySelectorAll(`.${e.target.value}`);
    permissions.forEach((permission) => (permission.checked = is_checked));
  }
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
                <h1>Create Roles</h1>
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
          <form onSubmit={handleSubmitfist}>
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Create a role</h3>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="form-group col-md-6">
                    <label htmlFor="name">
                      Name <span className="text-danger">*</span>
                    </label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      allowClear
                      className={classnames("form-control form-control-sm", {
                        "is-invalid": errors.name,
                      })}
                      onChange={handleChange}
                      value={values.name}
                    />
                  
                    <div
                      className={classnames(
                        "invalid-feedback",
                        "custom-feedback",
                        {
                          "custom-visibible": errors.name,
                        }
                      )}
                    >
                      {errors.name}
                    </div>
                  </div>
                  <div className="form-group col-md-6 pt-md-3">
                    <div className="custom-control custom-checkbox">
                      <input
                        className="custom-control-input"
                        type="checkbox"
                        name="default"
                        id="default"
                      />
                      <label htmlFor="default" className="custom-control-label">
                        Make Role Default
                      </label>
                    </div>
                    <div>
                      <i className="fa fa-info-circle text-info mr-1"></i>
                      Checking this field makes this role the default.
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="name">
                    Permissions <span className="text-danger">*</span>
                    <div
                      className={classnames(
                        "invalid-feedback",
                        "custom-feedback",
                        "font-weight-light",
                        {
                          "custom-visibible": errors.permissions,
                        }
                      )}
                    >
                      {errors.permissions}
                    </div>
                  </label>
                </div>
                {all_system_permissions &&
                  Object.keys(all_system_permissions).map(
                    (permission, index) => {
                      return (
                        <Permissions
                          index={index}
                          key={permission}
                          permission={permission}
                          all_permissions={all_system_permissions}
                          handleCheckChange={handleCheckChange}
                        />
                      );
                    }
                  )}

                {/* /.card */}
                <button
                  type="submit"
                  className="btn btn-primary d-flex"
                  disabled={spinner}
                >
                  <span className="shift_up">
                    <i class="fas fa-plus-circle"></i> Create
                    <MiniSpinner color="white" d-hidden spinner={spinner} />
                  </span>
                </button>
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

export default CreateRoles;
