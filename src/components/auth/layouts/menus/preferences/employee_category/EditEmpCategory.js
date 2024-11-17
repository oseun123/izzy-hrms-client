import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Input, Button, Space } from "antd";
import { FormOutlined, EyeOutlined } from "@ant-design/icons";
import classnames from "classnames";

import { updateEmpCategory } from "../../../../../../store/actions/preferencesActions";
import { useDispatch } from "react-redux";
import {
  useShallowEqualSelector,
  useForm,
  useAxiosPrivate,
  useCleanUp,
  usePreferenceNotification,
} from "../../../../../../hooks";
import { spinner_preferences } from "../../../../../../store/selectors/preferencesSelector";
import PreferencesHero from "../PreferencesHero";
import styles from "../../../../../styles/layout/Layout.module.css";
import AminatedLayout from "../../../../../ui/AminatedLayout";
import { useGetSystemEmpCategory } from "../../../../../../store/actions/preferencesHooksActions";

function EditEmpCategory() {
  const { id } = useParams();
  const [creds, setCreds] = useState({});
  const [enabled, setEnabled] = useState(true);
  const [single_emp_cat, setSingleEmpCat] = useState(null);

  useCleanUp();
  usePreferenceNotification();

  const { isLoading, data } = useGetSystemEmpCategory(enabled, setEnabled);
  const dispatch = useDispatch();
  const spinner = useShallowEqualSelector(spinner_preferences);

  const request = useAxiosPrivate();

  //callback
  function editEmpCategoryCallback() {
    updateEmpCategory(dispatch, request, creds).then((res) => {
      if (res?.status === "success") {
      }
    });
  }

  //validation

  function validateeditEmpCategory(values) {
    let errors = {};

    if (values.hasOwnProperty("name") && values.name === "") {
      errors.name = "Name cannot not be empty.";
    }

    return errors;
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

  const { errors, handleSubmit } = useForm(
    editEmpCategoryCallback,
    creds,
    validateeditEmpCategory
  );

  useEffect(() => {
    if (data && Object.keys(data).length) {
      const employeeCategory = data?.payload?.employeeCategory;
      const single_cat = employeeCategory.find(
        (item) => parseInt(item.id) === parseInt(id)
      );

      setSingleEmpCat(single_cat);
    }
  }, [data, id]);

  useEffect(() => {
    setCreds({
      name: single_emp_cat?.name,
      emp_cat_id: single_emp_cat?.id,
    });
  }, [single_emp_cat]);

  return (
    <>
      <PreferencesHero />

      <AminatedLayout>
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Edit Employee Category</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Preferences</li>
                  <li className="breadcrumb-item active">Employee Category</li>
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
                <h3 className="card-title">Modify employee category</h3>
                <div className="card-tools"></div>
              </div>
              <form onSubmit={(e) => handleSubmit(e, creds)}>
                <div className="card-body">
                  <div className="row">
                    <div className="form-group col-md-4 offset-md-4 d-flex flex-column ">
                      <label htmlFor="name">
                        Name <span className="text-danger">*</span>{" "}
                      </label>
                      <Input
                        type="text"
                        name="name"
                        id="name"
                        allowClear
                        value={creds?.name || null}
                        onChange={handleChangeCreds}
                        status={errors.name ? "error" : ""}
                        className="w-75"
                        placeholder="Name of employee category"
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
                  </div>

                  <div className="row">
                    <div className="form-group col-md-4 offset-md-4">
                      <Space>
                        <Button
                          type="primary"
                          icon={<FormOutlined />}
                          loading={spinner || isLoading}
                          htmlType="submit"
                          className={styles.on_hover}
                        >
                          {" "}
                          Update
                        </Button>
                        <Link to="/preferences/view-employee-category">
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
          </div>
        </section>
        {/* /.content */}
      </AminatedLayout>
    </>
  );
}

export default EditEmpCategory;
