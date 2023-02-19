import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { Input, Button, Space, Checkbox, Select } from "antd";
import { FormOutlined, EyeOutlined } from "@ant-design/icons";
import classnames from "classnames";

import { validateUpdateBranch } from "../../../../../../util/formValidations";
import {
  updateBranch,
  preferencesCleanUp,
} from "../../../../../../store/actions/preferencesActions";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
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
  single_system_branch,
} from "../../../../../../store/selectors/preferencesSelector";
import Message from "../../../../../helpers/Message";
import {
  useGetSystemCompany,
  useGetSystemUsers,
  useGetSystemBranch,
} from "./../../../../../../store/actions/preferencesHooksActions";
import PreferencesHero from "../PreferencesHero";
const { Option } = Select;

function EditBranch() {
  const { id } = useParams();
  const history = useHistory();

  const [enableduser, setEnabledUser] = useState(true);
  const [enabledcompany, setEnabledCompany] = useState(true);
  const [enabledbranch, setEnabledBranch] = useState(true);
  const [all_company, setAllCompany] = useState([]);
  const [all_users, setAllUsers] = useState([]);

  const dispatch = useDispatch();

  useGetSystemCompany(enabledcompany, setEnabledCompany, "_", "_", "all");
  useGetSystemUsers(enableduser, setEnabledUser);
  useGetSystemBranch(enabledbranch, setEnabledBranch);
  const spinner = useShallowEqualSelector(spinner_preferences);
  const status = useShallowEqualSelector(status_preferences);
  const message = useShallowEqualSelector(message_preferences);
  const companys = useShallowEqualSelector(system_companys);
  const users = useShallowEqualSelector(system_users);
  const request = useAxiosPrivate();
  const single_branch = useSelector(
    (state) => single_system_branch(state, id),
    shallowEqual
  );

  const name = single_branch[0]?.name;
  const company_id = single_branch[0]?.company_id;
  const address = single_branch[0]?.address;
  const email = single_branch[0]?.email;
  const code = single_branch[0]?.code;
  const phone_1 = single_branch[0]?.phone_1;
  const phone_2 = single_branch[0]?.phone_2;
  const headquarters = single_branch[0]?.headquarters;
  let branch_managers = single_branch[0]?.managers;
  if (branch_managers?.length) {
    let new_branch_managers = [];
    branch_managers.forEach((man) => {
      new_branch_managers.push(man.id);
    });
    branch_managers = new_branch_managers;
  }
  //   console.log(branch_managers);

  const initValues = {
    name,
    company_id,
    address,
    email,
    code,
    phone_1,
    phone_2,
    headquarters,
    branch_managers,
    branch_id: id,
  };

  //callback
  function updateBranchCallback() {
    updateBranch(dispatch, request, values);
  }

  const { values, errors, handleChange, handleSubmit } = useForm(
    updateBranchCallback,
    initValues,
    validateUpdateBranch
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

  // eslint-disable-next-line
  useEffect(() => {
    if (!single_branch.length) {
      history.push("/preferences/view-branches");
    }
  }, [single_branch, history]);

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
              <h1>Edit Branch</h1>
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
            <h3 className="card-title">Edit a branch</h3>
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
                      icon={<FormOutlined />}
                      loading={spinner}
                      htmlType="submit"
                    >
                      {" "}
                      Update
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

export default EditBranch;
