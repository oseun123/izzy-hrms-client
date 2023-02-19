import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Input, Button, Space } from "antd";
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

function CreateEmployee() {
  const initValues = {
    first_name: "",
    middle_name: "",
    last_name: "",
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
  useEffect(() => {
    return () => {
      return hrCleanUp(dispatch);
    };
  }, [dispatch]);
  return (
    <>
      <HumanResourceHero />
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
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active">Human resource</li>
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
            <h3 className="card-title">Create an employee</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="card-body">
              <div className="row">
                <div className="form-group col-md-4 ">
                  <label htmlFor="first_name">
                    First name <span className="text-danger">*</span>{" "}
                  </label>
                  <Input
                    type="text"
                    name="first_name"
                    id="first_name"
                    allowClear
                    value={values.first_name}
                    onChange={handleChange}
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
                <div className="form-group col-md-4 ">
                  <label htmlFor="middle_name">
                    Middle name <span className="text-danger">*</span>{" "}
                  </label>
                  <Input
                    type="text"
                    name="middle_name"
                    id="middle_name"
                    allowClear
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
                <div className="form-group col-md-4 ">
                  <label htmlFor="last_name">
                    Last name <span className="text-danger">*</span>{" "}
                  </label>
                  <Input
                    type="text"
                    name="last_name"
                    id="last_name"
                    allowClear
                    value={values.last_name}
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
          {/* /.card-body */}
        </div>
        {/* /.card */}
      </section>
      {/* /.content */}
    </>
  );
}

export default CreateEmployee;
