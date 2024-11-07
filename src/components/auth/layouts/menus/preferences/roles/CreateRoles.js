import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import {
  useShallowEqualSelector,
  useAxiosPrivate,
} from "../../../../../../hooks";
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
import {
  createRole,
  preferencesCleanUp,
} from "../../../../../../store/actions/preferencesActions";
import classnames from "classnames";
import Message from "../../../../../helpers/Message";
import { Input, Button, Space } from "antd";
import { PlusCircleOutlined, EyeOutlined } from "@ant-design/icons";
import styles from "../../../../../styles/layout/Layout.module.css";

import PreferencesHero from "../PreferencesHero";
import AminatedLayout from "../../../../../ui/AminatedLayout";

function CreateRoles() {
  const [enabled, setEnabled] = useState(true);
  const dispatch = useDispatch();
  useGetSystemPermissions(enabled, setEnabled);
  const spinner = useShallowEqualSelector(spinner_preferences);
  const status = useShallowEqualSelector(status_preferences);
  const message = useShallowEqualSelector(message_preferences);
  const all_system_permissions = useShallowEqualSelector(system_permissions);
  const request = useAxiosPrivate();

  const initRoles = {
    name: "",
    default: false,
    permissions: [],
  };
  // callback
  const createRolesFromform = () => {
    createRole(dispatch, request, values).then((res) => {
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
      preferencesCleanUp(dispatch);
    };
  }, [dispatch]);

  return (
    <>
      <div>
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
                        status={errors.name ? "error" : ""}
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
                        <label
                          htmlFor="default"
                          className="custom-control-label"
                        >
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
                  <Space>
                    <Button
                      type="primary"
                      icon={<PlusCircleOutlined />}
                      loading={spinner}
                      htmlType="submit"
                      className={styles.on_hover}
                    >
                      {" "}
                      Create
                    </Button>
                    <Link to="/preferences/view-roles">
                      <Button
                        icon={<EyeOutlined />}
                        className={styles.on_hover}
                      >
                        {" "}
                        View
                      </Button>
                    </Link>
                  </Space>
                </div>
              </div>
            </form>
            {/* /.card */}
          </section>
          {/* /.content */}
        </AminatedLayout>
      </div>
    </>
  );
}

export default CreateRoles;
