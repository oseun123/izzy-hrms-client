import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Input, Button, Space, Select } from "antd";
import { FormOutlined, EyeOutlined } from "@ant-design/icons";
import classnames from "classnames";

import { validateCreateDepartment } from "../../../../../../util/formValidations";
import {
  updateDepartment,
  preferencesCleanUp,
} from "../../../../../../store/actions/preferencesActions";
import { useGetSystemDepartment } from "../../../../../../store/actions/preferencesHooksActions";
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
  single_system_department,
} from "../../../../../../store/selectors/preferencesSelector";
import Message from "../../../../../helpers/Message";
import PreferencesHero from "../PreferencesHero";
import styles from "../../../../../styles/layout/Layout.module.css";
import AminatedLayout from "../../../../../ui/AminatedLayout";
import { useGetAllEmployee } from "../../../../../../store/actions/userHooksActions";

function EditDepartments() {
  const [creds, setCreds] = useState({});
  const [enabled, setEnabled] = useState(true);
  const [enabledEmp, setEnabledEmp] = useState(true);
  const [nam, setNam] = useState("");
  const [ho, setHOD] = useState("");

  const { id } = useParams();
  useGetSystemDepartment(enabled, setEnabled);
  const dispatch = useDispatch();
  const spinner = useShallowEqualSelector(spinner_preferences);
  const status = useShallowEqualSelector(status_preferences);
  const message = useShallowEqualSelector(message_preferences);
  const request = useAxiosPrivate();

  const { data, isLoading } = useGetAllEmployee(enabledEmp, setEnabledEmp);

  const single_department = useSelector(
    (state) => single_system_department(state, id),
    shallowEqual
  );

  const dept_name = single_department[0]?.name;
  const hod_id = single_department[0]?.hod;
  const initValues = {
    name: dept_name,
    hod: hod_id,
    dept_id: id,
  };

  // console.log({ single_department });

  //callback
  function updateDepartmentCallback() {
    updateDepartment(dispatch, request, creds);
  }

  const { errors, handleSubmit } = useForm(
    updateDepartmentCallback,
    creds,
    validateCreateDepartment
  );
  function handleSubmitfist(e) {
    e.preventDefault();
    console.log({ creds });

    // values.name = document.querySelector("#name").value;
    // values.hod = document.querySelector("#hod").value;

    handleSubmit(e, creds);
  }
  // set department name incase of refresh
  useEffect(() => {
    setNam(dept_name);
    setHOD(hod_id);
  }, [dept_name, hod_id, creds]);

  useEffect(() => {
    return () => {
      return preferencesCleanUp(dispatch);
    };
  }, [dispatch]);

  useEffect(() => {
    setCreds({ ...initValues });
  }, []);

  function handleSelect(value, name) {
    // alert("here");
    console.log({ name, value });
    handleChangeCreds("_", true, { name, value });
  }

  function handleChangeCreds(e, sep = false, creds = {}) {
    if (sep) {
      setCreds((prevValues) => {
        if (!creds.name || creds.value === undefined) {
          console.error("Invalid creds provided:", creds);
          return prevValues; // Do not update if creds are invalid
        }
        return { ...prevValues, [creds.name]: creds.value };
      });
    } else if (e && e.target) {
      setCreds((prevValues) => {
        return { ...prevValues, [e.target.name]: e.target.value };
      });
    } else {
      console.error("Invalid event provided:", e);
    }
  }

  console.log({ creds });
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
                <h1>Edit Department</h1>
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
              <h3 className="card-title">Edit a department</h3>
              <div className="card-tools"></div>
            </div>
            <form onSubmit={handleSubmitfist}>
              <div className="card-body">
                <div className="row d-flex justify-content-center ">
                  <div className="form-group col-md-3">
                    <label htmlFor="name">
                      Name <span className="text-danger">*</span>{" "}
                    </label>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      allowClear
                      value={creds.name}
                      onChange={handleChangeCreds}
                      status={errors.name ? "error" : ""}
                      // defaultValue={nam}
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
                      value={creds.hod}
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
                      // defaultValue={ho}
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
                        icon={<FormOutlined />}
                        loading={spinner}
                        htmlType="submit"
                        className={styles.on_hover}
                      >
                        {" "}
                        Update
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

export default EditDepartments;
