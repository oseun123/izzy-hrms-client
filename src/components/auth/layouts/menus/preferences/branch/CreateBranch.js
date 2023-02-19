import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Input, Button, Space, Checkbox, Select } from "antd";
import { PlusCircleOutlined, EyeOutlined } from "@ant-design/icons";
import classnames from "classnames";

import { validateCreateBranch } from "../../../../../../util/formValidations";
import {
  createBranch,
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
  system_companys,
  system_users,
} from "../../../../../../store/selectors/preferencesSelector";
import Message from "../../../../../helpers/Message";
import {
  useGetSystemCompany,
  useGetSystemUsers,
} from "./../../../../../../store/actions/preferencesHooksActions";
import PreferencesHero from "../PreferencesHero";
const { Option } = Select;

function CreateBranch() {
  const initValues = {
    name: "",
    company_id: "",
    address: "",
    email: "",
    code: "",
    phone_1: "",
    phone_2: "",
    headquarters: false,
    branch_managers: [],
  };
  const [enableduser, setEnabledUser] = useState(true);
  const [enabledcompany, setEnabledCompany] = useState(true);
  const [all_company, setAllCompany] = useState([]);
  const [all_users, setAllUsers] = useState([]);

  const dispatch = useDispatch();

  useGetSystemCompany(enabledcompany, setEnabledCompany, "_", "_", "all");
  useGetSystemUsers(enableduser, setEnabledUser);
  const spinner = useShallowEqualSelector(spinner_preferences);
  const status = useShallowEqualSelector(status_preferences);
  const message = useShallowEqualSelector(message_preferences);
  const companys = useShallowEqualSelector(system_companys);
  const users = useShallowEqualSelector(system_users);
  const request = useAxiosPrivate();

  //callback
  function createBranchCallback() {
    createBranch(dispatch, request, values).then((res) => {
      if (res?.status === "success") {
        clearForm();
      }
    });
  }

  const { values, errors, handleChange, handleSubmit, clearForm } = useForm(
    createBranchCallback,
    initValues,
    validateCreateBranch
  );

  const handleChangeCompany = (id) => {
    handleChange("_", true, { name: "company_id", value: id });
  };
  const handleChangeUsers = (users) => {
    handleChange("_", true, { name: "branch_managers", value: users });
  };
  const handleChangeHeadQuarter = (e) => {
    handleChange("_", true, { name: "headquarters", value: e.target.checked });
  };

  useEffect(() => {
    setAllCompany(companys);
  }, [companys]);

  useEffect(() => {
    setAllUsers(users);
  }, [users]);

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
              <h1>Create Branch</h1>
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
            <h3 className="card-title">Create a branch</h3>
            <div className="card-tools"></div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="card-body">
              <div className="row">
                <div className="form-group col-md-4 ">
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
                <div className="form-group col-md-4 ">
                  <label htmlFor="email">Email </label>
                  <Input
                    type="text"
                    name="email"
                    id="email"
                    allowClear
                    value={values.email}
                    onChange={handleChange}
                    status={errors.email ? "error" : ""}
                  />

                  <div
                    className={classnames(
                      "invalid-feedback",
                      "custom-feedback",
                      {
                        "custom-visibible": errors.email,
                      }
                    )}
                  >
                    {errors.email}
                  </div>
                </div>
                <div className="form-group col-md-4 ">
                  <label htmlFor="address">
                    Address <span className="text-danger">*</span>{" "}
                  </label>
                  <Input.TextArea
                    name="address"
                    id="address"
                    allowClear
                    value={values.address}
                    onChange={handleChange}
                    status={errors.address ? "error" : ""}
                  />

                  <div
                    className={classnames(
                      "invalid-feedback",
                      "custom-feedback",
                      {
                        "custom-visibible": errors.address,
                      }
                    )}
                  >
                    {errors.address}
                  </div>
                </div>

                <div className="form-group col-md-4 ">
                  <label htmlFor="phone_1">Phone 1 </label>
                  <Input
                    type="text"
                    name="phone_1"
                    id="phone_1"
                    allowClear
                    value={values.phone_1}
                    onChange={handleChange}
                    status={errors.phone_1 ? "error" : ""}
                  />

                  <div
                    className={classnames(
                      "invalid-feedback",
                      "custom-feedback",
                      {
                        "custom-visibible": errors.phone_1,
                      }
                    )}
                  >
                    {errors.phone_1}
                  </div>
                </div>
                <div className="form-group col-md-4 ">
                  <label htmlFor="phone_2">Phone 2 </label>
                  <Input
                    type="text"
                    name="phone_2"
                    id="phone_2"
                    allowClear
                    value={values.phone_2}
                    onChange={handleChange}
                    status={errors.phone_2 ? "error" : ""}
                  />

                  <div
                    className={classnames(
                      "invalid-feedback",
                      "custom-feedback",
                      {
                        "custom-visibible": errors.phone_2,
                      }
                    )}
                  >
                    {errors.phone_2}
                  </div>
                </div>
                <div className="form-group col-md-4 ">
                  <label htmlFor="code">Code </label>
                  <Input
                    type="text"
                    name="code"
                    id="code"
                    allowClear
                    value={values.code}
                    onChange={handleChange}
                    status={errors.code ? "error" : ""}
                  />

                  <div
                    className={classnames(
                      "invalid-feedback",
                      "custom-feedback",
                      {
                        "custom-visibible": errors.code,
                      }
                    )}
                  >
                    {errors.code}
                  </div>
                </div>

                <div className="form-group col-md-4 pt-md-3">
                  <Checkbox
                    checked={values.headquarters}
                    onChange={handleChangeHeadQuarter}
                  >
                    Make branch headquarter
                  </Checkbox>
                  <div>
                    <i className="fa fa-info-circle text-info mr-1"></i>
                    Checking this field makes this branch an headquarter for the
                    selected company.
                  </div>
                </div>

                <div className="form-group col-md-4">
                  <label htmlFor="name">
                    Company <span className="text-danger">*</span>
                  </label>
                  <Select
                    style={{
                      width: "100%",
                    }}
                    showSearch
                    status={errors.company_id ? "error" : ""}
                    id="company_id"
                    name="company_id"
                    allowClear
                    onChange={handleChangeCompany}
                    filterOption={(input, option) => {
                      return option.children[1]
                        .toLowerCase()
                        .includes(input.toLowerCase());
                    }}
                    value={values.company_id}
                  >
                    {all_company &&
                      all_company.map((company) => (
                        <Option key={company.id} value={company.id}>
                          {" "}
                          {company.name}
                        </Option>
                      ))}
                  </Select>

                  <div
                    className={classnames(
                      "invalid-feedback",
                      "custom-feedback",
                      {
                        "custom-visibible": errors.company_id,
                      }
                    )}
                  >
                    {errors.company_id}
                  </div>
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="branch_managers">
                    Branch managers <span className="text-danger">*</span>
                  </label>
                  <Select
                    style={{
                      width: "100%",
                    }}
                    showSearch
                    status={errors.branch_managers ? "error" : ""}
                    id="branch_managers"
                    name="branch_managers"
                    mode="multiple"
                    allowClear
                    value={values.branch_managers}
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
                        "custom-visibible": errors.branch_managers,
                      }
                    )}
                  >
                    {errors.branch_managers}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="form-group col-md-6 ">
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
                    <Link to="/preferences/view-branches">
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

export default CreateBranch;
