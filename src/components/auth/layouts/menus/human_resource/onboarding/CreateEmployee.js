import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Input, Button, Space, DatePicker } from "antd";
import { PlusCircleOutlined, EyeOutlined } from "@ant-design/icons";
import classnames from "classnames";
import {
  spinner_hr,
  message_hr,
  status_hr,
} from "../../../../../../store/selectors/humanresourceSelector";
import Message from "../../../../../helpers/Message";
import { useDispatch } from "react-redux";
import {
  useShallowEqualSelector,
  useForm,
  useAxiosPrivate,
} from "../../../../../../hooks";
import { validateCreateEmployee } from "../../../../../../util/formValidations";
import {
  createEmployee,
  hrCleanUp,
} from "../../../../../../store/actions/hrActions";
import HumanResourceHero from "../HumanResourceHero";
import AminatedLayout from "../../../../../ui/AminatedLayout";
import styles from "../../../../../styles/layout/Layout.module.css";

function CreateEmployee() {
  const initValues = {
    first_name: "",
    middle_name: "",
    last_name: "",
    employee_number: "",
    employment_date: "",
    employment_type: "",
    department: "",
    designation: "",
    primary_supervisor: "",
    secondary_supervisor: "",
    employment_status: "",
    employee_category: "",
    work_email: "",
  };

  const spinner = useShallowEqualSelector(spinner_hr);
  const status = useShallowEqualSelector(status_hr);
  const message = useShallowEqualSelector(message_hr);
  const request = useAxiosPrivate();
  const dispatch = useDispatch();

  //callback
  function createEmployeeCallback() {
    createEmployee(dispatch, request, values).then((res) => {
      if (res?.status === "success") {
        clearForm();
      }
    });
  }

  const { values, errors, handleChange, handleSubmit, clearForm } = useForm(
    createEmployeeCallback,
    initValues,
    validateCreateEmployee
  );

  function handleSpecialDateChange(value, name) {
    // console.log({ name, value: value.format("YYYY-MM-DD") });
    handleChange("_", true, { name, value: value });
  }
  useEffect(() => {
    return () => {
      return hrCleanUp(dispatch);
    };
  }, [dispatch]);
  return (
    <>
      <HumanResourceHero />
      <AminatedLayout>
        {/* Content Header (Page header) */}
        <section className="content-header">
          {message && status ? (
            <Message message={message} status={status} />
          ) : null}
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Create Employee</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Human resource</li>
                  <li className="breadcrumb-item active">Onboarding</li>
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content col-md-12">
          <div className="container-fluid">
            {/* Default box */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Add new employee record</h3>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="card-body">
                  <div className="row ">
                    <div className="form-group col-md-4  d-flex flex-column ">
                      <label htmlFor="first_name">
                        First name <span className="text-danger">*</span>{" "}
                      </label>
                      <Input
                        type="text"
                        name="first_name"
                        id="first_name"
                        allowClear
                        className="w-75"
                        value={values.first_name}
                        onChange={handleChange}
                        placeholder="first name"
                        status={errors.first_name ? "error" : ""}
                      />

                      <div
                        className={classnames(
                          "invalid-feedback",
                          "custom-feedback",
                          {
                            "custom-visibible": errors.first_name,
                          }
                        )}
                      >
                        {errors.first_name}
                      </div>
                    </div>
                    <div className="form-group col-md-4  d-flex flex-column ">
                      <label htmlFor="middle_name">
                        Middle name <span className="text-danger">*</span>{" "}
                      </label>
                      <Input
                        type="text"
                        name="middle_name"
                        id="middle_name"
                        allowClear
                        className="w-75"
                        placeholder="Middle name"
                        value={values.middle_name}
                        onChange={handleChange}
                        status={errors.middle_name ? "error" : ""}
                      />

                      <div
                        className={classnames(
                          "invalid-feedback",
                          "custom-feedback",
                          {
                            "custom-visibible": errors.middle_name,
                          }
                        )}
                      >
                        {errors.middle_name}
                      </div>
                    </div>
                    <div className="form-group col-md-4  d-flex flex-column ">
                      <label htmlFor="last_name">
                        Last name <span className="text-danger">*</span>{" "}
                      </label>
                      <Input
                        type="text"
                        name="last_name"
                        id="last_name"
                        allowClear
                        className="w-75"
                        value={values.last_name}
                        placeholder="Last name"
                        onChange={handleChange}
                        status={errors.last_name ? "error" : ""}
                      />

                      <div
                        className={classnames(
                          "invalid-feedback",
                          "custom-feedback",
                          {
                            "custom-visibible": errors.last_name,
                          }
                        )}
                      >
                        {errors.last_name}
                      </div>
                    </div>
                    <div className="form-group col-md-4  d-flex flex-column ">
                      <label htmlFor="work_email">
                        Work email <span className="text-danger">*</span>{" "}
                      </label>
                      <Input
                        type="text"
                        name="work_email"
                        id="work_email"
                        allowClear
                        className="w-75"
                        placeholder="Work email"
                        value={values.work_email}
                        onChange={handleChange}
                        status={errors.work_email ? "error" : ""}
                      />

                      <div
                        className={classnames(
                          "invalid-feedback",
                          "custom-feedback",
                          {
                            "custom-visibible": errors.work_email,
                          }
                        )}
                      >
                        {errors.work_email}
                      </div>
                    </div>
                    <div className="form-group col-md-4  d-flex flex-column ">
                      <label htmlFor="employment_date">
                        Employment Date <span className="text-danger">*</span>{" "}
                      </label>
                      <DatePicker
                        type="text"
                        name="employment_date"
                        id="employment_date"
                        allowClear
                        className="w-75"
                        placeholder="Employment date"
                        value={values.employment_date}
                        onChange={(value) =>
                          handleSpecialDateChange(value, "employment_date")
                        }
                        status={errors.employment_date ? "error" : ""}
                      />

                      <div
                        className={classnames(
                          "invalid-feedback",
                          "custom-feedback",
                          {
                            "custom-visibible": errors.employment_date,
                          }
                        )}
                      >
                        {errors.employment_date}
                      </div>
                    </div>
                    <div className="form-group col-md-4  d-flex flex-column ">
                      <label htmlFor="employee_number">
                        Employee Number <span className="text-danger">*</span>{" "}
                      </label>
                      <Input
                        type="text"
                        name="employee_number"
                        id="employee_number"
                        allowClear
                        className="w-75"
                        value={values.employee_number}
                        onChange={handleChange}
                        placeholder="Employee Number"
                        status={errors.employee_number ? "error" : ""}
                      />

                      <div
                        className={classnames(
                          "invalid-feedback",
                          "custom-feedback",
                          {
                            "custom-visibible": errors.employee_number,
                          }
                        )}
                      >
                        {errors.employee_number}
                      </div>
                    </div>
                    <div className="form-group col-md-4  d-flex flex-column ">
                      <label htmlFor="employment_type">
                        Employment type <span className="text-danger">*</span>{" "}
                      </label>
                      <Input
                        type="text"
                        name="employment_type"
                        id="employment_type"
                        allowClear
                        className="w-75"
                        value={values.employment_type}
                        onChange={handleChange}
                        placeholder="Employment type"
                        status={errors.employment_type ? "error" : ""}
                      />

                      <div
                        className={classnames(
                          "invalid-feedback",
                          "custom-feedback",
                          {
                            "custom-visibible": errors.employment_type,
                          }
                        )}
                      >
                        {errors.employment_type}
                      </div>
                    </div>
                    <div className="form-group col-md-4  d-flex flex-column ">
                      <label htmlFor="department">
                        Department <span className="text-danger">*</span>{" "}
                      </label>
                      <Input
                        type="text"
                        name="department"
                        id="department"
                        allowClear
                        className="w-75"
                        placeholder="Department"
                        value={values.department}
                        onChange={handleChange}
                        status={errors.department ? "error" : ""}
                      />

                      <div
                        className={classnames(
                          "invalid-feedback",
                          "custom-feedback",
                          {
                            "custom-visibible": errors.department,
                          }
                        )}
                      >
                        {errors.department}
                      </div>
                    </div>
                    <div className="form-group col-md-4  d-flex flex-column ">
                      <label htmlFor="designation">
                        Designation <span className="text-danger">*</span>{" "}
                      </label>
                      <Input
                        type="text"
                        name="designation"
                        id="designation"
                        placeholder="Designation"
                        allowClear
                        className="w-75"
                        value={values.designation}
                        onChange={handleChange}
                        status={errors.designation ? "error" : ""}
                      />

                      <div
                        className={classnames(
                          "invalid-feedback",
                          "custom-feedback",
                          {
                            "custom-visibible": errors.designation,
                          }
                        )}
                      >
                        {errors.designation}
                      </div>
                    </div>
                    <div className="form-group col-md-4  d-flex flex-column ">
                      <label htmlFor="primary_supervisor">
                        Primary supervisor{" "}
                        <span className="text-danger">*</span>{" "}
                      </label>
                      <Input
                        type="text"
                        name="primary_supervisor"
                        id="primary_supervisor"
                        allowClear
                        className="w-75"
                        placeholder=" Primary supervisor"
                        value={values.primary_supervisor}
                        onChange={handleChange}
                        status={errors.primary_supervisor ? "error" : ""}
                      />

                      <div
                        className={classnames(
                          "invalid-feedback",
                          "custom-feedback",
                          {
                            "custom-visibible": errors.primary_supervisor,
                          }
                        )}
                      >
                        {errors.primary_supervisor}
                      </div>
                    </div>

                    <div className="form-group col-md-4  d-flex flex-column ">
                      <label htmlFor="secondary_supervisor">
                        Secondary supervisor{" "}
                        <span className="text-danger">*</span>{" "}
                      </label>
                      <Input
                        type="text"
                        name="secondary_supervisor"
                        id="secondary_supervisor"
                        allowClear
                        className="w-75"
                        placeholder="Secondary supervisor"
                        value={values.secondary_supervisor}
                        onChange={handleChange}
                        status={errors.secondary_supervisor ? "error" : ""}
                      />

                      <div
                        className={classnames(
                          "invalid-feedback",
                          "custom-feedback",
                          {
                            "custom-visibible": errors.secondary_supervisor,
                          }
                        )}
                      >
                        {errors.secondary_supervisor}
                      </div>
                    </div>
                    <div className="form-group col-md-4  d-flex flex-column ">
                      <label htmlFor="employment_status">
                        Employment Status <span className="text-danger">*</span>{" "}
                      </label>
                      <Input
                        type="text"
                        name="employment_status"
                        id="employment_status"
                        placeholder="Employment Status"
                        allowClear
                        className="w-75"
                        value={values.employment_status}
                        onChange={handleChange}
                        status={errors.employment_status ? "error" : ""}
                      />

                      <div
                        className={classnames(
                          "invalid-feedback",
                          "custom-feedback",
                          {
                            "custom-visibible": errors.employment_status,
                          }
                        )}
                      >
                        {errors.employment_status}
                      </div>
                    </div>
                    <div className="form-group col-md-4  d-flex flex-column ">
                      <label htmlFor="employee_category">
                        Employee category <span className="text-danger">*</span>{" "}
                      </label>
                      <Input
                        type="text"
                        name="employee_category"
                        id="employee_category"
                        allowClear
                        className="w-75"
                        placeholder="Employee category"
                        value={values.employee_category}
                        onChange={handleChange}
                        status={errors.employee_category ? "error" : ""}
                      />

                      <div
                        className={classnames(
                          "invalid-feedback",
                          "custom-feedback",
                          {
                            "custom-visibible": errors.employee_category,
                          }
                        )}
                      >
                        {errors.employee_category}
                      </div>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="form-group col-md-12">
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
                        <Link to="/preferences/view-branches">
                          <Button
                            icon={<EyeOutlined />}
                            className={styles.on_hover_secondary}
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
              {/* /.card-body */}
            </div>
            {/* /.card */}
          </div>
        </section>
        {/* /.content */}
      </AminatedLayout>
    </>
  );
}

export default CreateEmployee;
