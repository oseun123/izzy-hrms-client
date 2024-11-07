import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Input, Button, Space, Select } from "antd";
import { PlusCircleOutlined, EyeOutlined } from "@ant-design/icons";
import classnames from "classnames";

import { validateCreateDepartment } from "../../../../../../util/formValidations";
import {
  createDepartment,
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
import styles from "../../../../../styles/layout/Layout.module.css";
import AminatedLayout from "../../../../../ui/AminatedLayout";
import { useGetAllEmployee } from "../../../../../../store/actions/userHooksActions";

function CreateDepartments() {
  const [enabled, setEnabled] = useState(true);
  const initValues = {
    name: "",
    hod: "",
  };
  const dispatch = useDispatch();
  const spinner = useShallowEqualSelector(spinner_preferences);
  const status = useShallowEqualSelector(status_preferences);
  const message = useShallowEqualSelector(message_preferences);
  const request = useAxiosPrivate();

  const { data, isLoading } = useGetAllEmployee(enabled, setEnabled);

  // console.log({ data });

  //callback
  function createDepartmentCallback() {
    createDepartment(dispatch, request, values).then((res) => {
      if (res?.status === "success") {
        clearForm();
      }
    });
  }

  const { values, errors, handleChange, handleSubmit, clearForm } = useForm(
    createDepartmentCallback,
    initValues,
    validateCreateDepartment
  );

  useEffect(() => {
    return () => {
      return preferencesCleanUp(dispatch);
    };
  }, [dispatch]);

  function handleSelect(value, name) {
    console.log({ value, name });
    handleChange("_", true, { name, value });
  }
  console.log({ values });

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
                <h1>Create Department</h1>
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
              <h3 className="card-title">Create a department</h3>
              <div className="card-tools"></div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="card-body">
                <div className="row d-flex justify-content-center">
                  <div className="form-group col-md-3 ">
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
                  <div className="form-group col-md-3">
                    <label htmlFor="name">HOD</label>
                    <Select
                      name="hod"
                      id="hod"
                      value={values.hod}
                      loading={isLoading ? true : false}
                      showSearch
                      className="w-100"
                      onChange={(value) => handleSelect(value, "hod")}
                      optionFilterProp="children"
                      filterOption={(input, option) => {
                        return (option?.value ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase());
                      }}
                    >
                      <option value="">--</option>
                      {data && Object.keys(data).length
                        ? data?.system_users.map((item) => {
                            return (
                              <option key={item.id} value={item.id}>
                                {item.fullname}
                              </option>
                            );
                          })
                        : null}
                    </Select>

                    <div
                      className={classnames(
                        "invalid-feedback",
                        "custom-feedback",
                        {
                          "custom-visibible": errors.hod,
                        }
                      )}
                    >
                      {errors.hod}
                    </div>
                  </div>

                  <div className="form-group col-md-6 offset-md-3">
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
                      <Link to="/preferences/view-departments">
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
              </div>
            </form>
          </div>
          {/* /.card */}
        </section>
        {/* /.content */}
      </AminatedLayout>
    </>
  );
}

export default CreateDepartments;
