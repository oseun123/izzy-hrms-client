import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import MiniSpinner from "../../../../../helpers/MiniSpinner";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import { useShallowEqualSelector } from "../../../../../../hooks";
import {
  spinner_preferences,
  message_preferences,
  status_preferences,
  system_permissions,
  single_system_role,
} from "../../../../../../store/selectors/preferencesSelector";
import Permissions from "./Permissions";
import {
  useGetSystemPermissions,
  useGetSystemRoles,
} from "../../../../../../store/actions/preferencesHooksActions";
import { useForm } from "../../../../../../hooks";
import { validateCreateRole } from "../../../../../../util/formValidations";
import { updateRole } from "../../../../../../store/actions/preferencesActions";
import classnames from "classnames";
import Message from "../../../../../helpers/Message";

function EditRoles() {
  const { id } = useParams();

  const [enabled, setEnabled] = useState(true);
  const [nam, setNam] = useState("");
  const dispatch = useDispatch();
  useGetSystemRoles(enabled, setEnabled);
  useGetSystemPermissions(enabled, setEnabled);
  const spinner = useShallowEqualSelector(spinner_preferences);
  const status = useShallowEqualSelector(status_preferences);
  const message = useShallowEqualSelector(message_preferences);
  const all_system_permissions = useShallowEqualSelector(system_permissions);
  const single_role = useSelector(
    (state) => single_system_role(state, id),
    shallowEqual
  );
  const role_name = single_role[0]?.name;
  const permissions = single_role[0]?.permissions;
  const is_default = single_role[0]?.default;

  const initRoles = {
    name: role_name,
    default: false,
    permissions: [],
    role_id: id,
  };
  // callback
  const updateRolesFromform = () => {
    updateRole(dispatch, values);
  };
  const { values, errors, handleChange, handleSubmit } = useForm(
    updateRolesFromform,
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
    values.name = document.querySelector("#name").value;
    values.permissions = [...ids];
    values.default = document.querySelector("#default").checked;
    values.role_id = id;
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

  // set role name
  useEffect(() => {
    values.name = role_name;
    setNam(role_name);
  }, [role_name, values]);
  // set default
  useEffect(() => {
    document.querySelector("#default").checked = is_default;
  }, [is_default]);
  useEffect(() => {
    setImmediate(() => {
      const permissions_checkbox = document.querySelectorAll(".perm-role");
      const perm_arry = [];
      permissions?.forEach((permission) => {
        perm_arry.push(permission.id);
      });
      permissions_checkbox.forEach((item) => {
        if (perm_arry.includes(parseInt(item.value))) {
          item.checked = true;
        }
      });
    });
  }, [permissions]);

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
                <h1>Edit Roles</h1>
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
                <h3 className="card-title">Edit a role</h3>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="form-group col-md-6">
                    <label htmlFor="name">
                      Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className={classnames("form-control", {
                        "is-invalid": errors.name,
                      })}
                      onChange={handleChange}
                      value={values.name}
                      defaultValue={nam}
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
                    <i className="fas fa-edit"></i> Update
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

export default EditRoles;
