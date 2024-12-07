import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Input, Button, Space, Select } from "antd";
import { PlusCircleOutlined, EyeOutlined } from "@ant-design/icons";
import classnames from "classnames";

import {
  createDepartment,
} from "../../../../../../store/actions/preferencesActions";
import { useDispatch } from "react-redux";
import {
 
  useAxiosPrivate,
  useCleanUp,
} from "../../../../../../hooks";


import PreferencesHero from "../PreferencesHero";
import styles from "../../../../../styles/layout/Layout.module.css";
import AminatedLayout from "../../../../../ui/AminatedLayout";
import { useGetAllEmployee } from "../../../../../../store/actions/userHooksActionsType";
import Avatar from "react-avatar";
import { MdOutlineLocalFireDepartment } from "react-icons/md";
import GeneralBackButton from "../../../../../ui/GeneralBackButton";
import { useCustomForm } from "../../../../../../util/hookstype";
import { User } from "../../../../../../@types/api.types";


interface FormValues {
  name: string,
  hod: string
}

function CreateDepartments() {

  useCleanUp();
  const dispatch = useDispatch();
  const request = useAxiosPrivate();
   const [loading, setLoading] = useState<boolean>(false);
   const [enabled, setEnabled] = useState<boolean>(true);
   const { data, isLoading } = useGetAllEmployee(enabled, setEnabled);

  const initValues : FormValues = {
    name: "",
    hod: "",
  };


  // Validation function
  const validateCreateDepartment = (values: FormValues): Record<string, string | undefined> => {
    const errors: Record<string, string | undefined> = {};
    if (!values.name.trim()) {
      errors.name = "Name is required";
    }


    return errors;
  };

 


  // console.log({ data });

  //callback
  function createDepartmentCallback() {
    setLoading(true);
    createDepartment(dispatch, request, values).then((res) => {
      setLoading(false);
      if (res?.status === "success") {
        clearForm();
      }
    });
  }

  const { values, errors, handleChange, handleSubmit, clearForm } = useCustomForm(
    createDepartmentCallback,
    initValues,
    validateCreateDepartment
  );





  return (
    <>
      <PreferencesHero />
      <AminatedLayout>
        {/* Content Header (Page header) */}
        <section className="content-header">
         
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
                  <li className="breadcrumb-item active">Department</li>
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
                <h3 className="card-title">
                  <span className="space__align">
                  <MdOutlineLocalFireDepartment />
                  Add new department

                  </span>
                  
                </h3>
                <div className="card-tools">
                  <GeneralBackButton/>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="card-body">
                  <div className="row ">
                    <div className="form-group col-md-4 d-flex flex-column ">
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
                        className="w-75"
                        placeholder="Name of department"
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
                    <div className="form-group col-md-4 d-flex flex-column">
                      <label htmlFor="name">HOD</label>
                     <Select
                        id="hod"
                        value={values.hod || null}
                        loading={isLoading ? true : false}
                        showSearch
                        onChange={(value) => handleChange({ name: "hod", value })}
                        optionFilterProp="children"
                        filterOption={(input, option) => {
                          // Ensure option.label is a string before calling toLowerCase
                          const label = option?.label ?? "";
                          return typeof label === 'string' && label.toLowerCase().includes(input.toLowerCase());
                        }}
                        className="w-75"
                        placeholder="Head of department"
                      >
                        <option value="">--</option>
                        {data && Object.keys(data).length
                          ? data?.system_users?.map((item: User) => {
                              return (
                                <option key={item.id} value={item.id} label={item.fullname}>
                                  <Space>
                                    <Avatar name={item.fullname} size="25" round={true} />
                                    {item.fullname}
                                  </Space>
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
                  </div>
                  <div className="row">
                    <div className="form-group col-md-4">
                      <Space>
                        <Button
                          type="primary"
                          icon={<PlusCircleOutlined />}
                          loading={loading}
                          htmlType="submit"
                          className={styles.on_hover}
                        >
                          {" "}
                          Create
                        </Button>
                        <Link to="/preferences/view-departments">
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
            </div>
            {/* /.card */}
          </div>
        </section>
        {/* /.content */}
      </AminatedLayout>
    </>
  );
}

export default CreateDepartments;
