import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Input, Button, Space } from "antd";
import { PlusCircleOutlined, EyeOutlined } from "@ant-design/icons";
import classnames from "classnames";

import { validateCreateCompany } from "../../../../../../util/formValidations";
import {
  createCompany,
  preferencesCleanUp,
} from "../../../../../../store/actions/preferencesActions";
import { useDispatch } from "react-redux";
import {
  useShallowEqualSelector,
  useForm,
  useAxiosPrivate,
} from "../../../../../../hooks";
import {
  spinner_preferences,
  message_preferences,
  status_preferences,
} from "../../../../../../store/selectors/preferencesSelector";
import Message from "../../../../../helpers/Message";
import PreferencesHero from "../PreferencesHero";

function CreateCompany() {
  const initValues = {
    name: "",
  };
  const dispatch = useDispatch();
  const spinner = useShallowEqualSelector(spinner_preferences);
  const status = useShallowEqualSelector(status_preferences);
  const message = useShallowEqualSelector(message_preferences);
  const request = useAxiosPrivate();

  //callback
  function createCompanyCallback() {
    createCompany(dispatch, request, values).then((res) => {
      if (res?.status === "success") {
        clearForm();
      }
    });
  }

  const { values, errors, handleChange, handleSubmit, clearForm } = useForm(
    createCompanyCallback,
    initValues,
    validateCreateCompany
  );

  useEffect(() => {
    return () => {
      return preferencesCleanUp(dispatch);
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
              <h1>Create Company</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="/">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Preferences</li>
              </ol>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      {/* Main content */}
      <section className="content">
        {/* Default box */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Create a company</h3>
            <div className="card-tools"></div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="card-body">
              <div className="row">
                <div className="form-group col-md-6 offset-md-3">
                  <label htmlFor="name">
                    Name <span className="text-danger">*</span>{" "}
                  </label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    allowClear
                    value={values.name}
                    onChange={handleChange}
                    status={errors.name ? "error" : ""}
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

                <div className="form-group col-md-6 offset-md-3">
                  <Space>
                    <Button
                      type="primary"
                      icon={<PlusCircleOutlined />}
                      loading={spinner}
                      htmlType="submit"
                    >
                      {" "}
                      Create
                    </Button>
                    <Link to="/preferences/view-companies">
                      <Button icon={<EyeOutlined />}> View</Button>
                    </Link>
                  </Space>
                </div>
              </div>
            </div>
          </form>
        </div>
        {/* /.card */}
      </section>
      {/* /.content */}
    </>
  );
}

export default CreateCompany;
