import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Input, Button, Space, Select } from "antd";
import { FormOutlined, EyeOutlined } from "@ant-design/icons";
import classnames from "classnames";

import {
  updateDepartment,

} from "../../../../../../store/actions/preferencesActions";
import { useGetSystemDepartment } from "../../../../../../store/actions/preferencesHooksActionsType";
import { useDispatch,} from "react-redux";
import {
  useAxiosPrivate,
  useCleanUp,
} from "../../../../../../hooks";


import PreferencesHero from "../PreferencesHero";
import styles from "../../../../../styles/layout/Layout.module.css";
import AminatedLayout from "../../../../../ui/AminatedLayout";
import { useGetAllEmployee } from "../../../../../../store/actions/userHooksActions";
import Avatar from "react-avatar";
import GeneralBackButton from "../../../../../ui/GeneralBackButton";
import { MdOutlineLocalFireDepartment } from "react-icons/md";
import { Department, User } from "../../../../../../@types/api.types";
import { useCustomForm } from "../../../../../../util/hookstype";



interface FormValues {
  id: number,
  name: string;
  hod: number | null;
}


function EditDepartments() {
  useCleanUp();
  const [enabled, setEnabled] = useState(true);
  const [enabledEmp, setEnabledEmp] = useState(true);
  const [selected, setSelected] = useState<Department | null>(null);
  const [loading, setLoading] = useState(false);


  const { id } = useParams();
 const {data:department_data}= useGetSystemDepartment(enabled, setEnabled,'all');
  const dispatch = useDispatch();


  const request = useAxiosPrivate();

  const { data, isLoading } = useGetAllEmployee(enabledEmp, setEnabledEmp);


   // Effect to set selected gender when data changes
  useEffect(() => {
    if (department_data && Object.keys(department_data).length) {
      
      const departments = department_data.payload?.departments || [];
      console.log({departments});
      const selectedDepartment = departments.find((item) => item.id === parseInt(id));
      setSelected(selectedDepartment || null);
    }
  }, [department_data, id]);

   // Initial form values based on selected gender
  const initValues: FormValues = {
    id: parseInt(id),
    name: selected?.name || '',
    hod: selected?.hod || null,
  };


    //callback
  function updateDepartmentCallback() {
      setLoading(true);
    updateDepartment(dispatch, request, values).then(()=>{

       setLoading(false);
    });
  }
 

    // Validation function for the form
  function validateEditDepartment(values: FormValues): Record<string, string | undefined>  {
    const errors: Record<string, string | undefined>  = {};
    if (!values.name.trim()) {
      errors.name = "Name is required";
    }
    return errors;
  }
  // Custom hook to manage form state and validation
  const { values, errors, handleChange, handleSubmit,clearForm } = useCustomForm(
    updateDepartmentCallback,
    initValues,
    validateEditDepartment
  );


// Effect to update form values when selected gender changes
  useEffect(() => {
    if (selected) {
      clearForm();
      values.name = selected.name; // Update form value directly
      values.hod = selected?.hod; // Update form value directly
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

 
console.log({values,selected,department_data})

  return (
    <>
      <PreferencesHero />
      <AminatedLayout>
        {/* Content Header (Page header) */}
        <section className="content-header">
         
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

                      Update department
                  </span>
                  
                  </h3>
                <div className="card-tools">
                  <GeneralBackButton/>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="card-body">
                  <div className="row ">
                    <div className="form-group col-md-4 d-flex flex-column">
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
                          ? data?.system_users.map((item:User) => {
                              return (
                                <option
                                  key={item.id}
                                  value={item.id}
                                  label={item.fullname}
                                >
                                  <Space>
                                    <Avatar
                                      name={item.fullname}
                                      size='25'
                                      round={true}
                                    />

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
                  <div className="row ">
                    <div className="form-group col-md-4">
                      <Space>
                        <Button
                          type="primary"
                          icon={<FormOutlined />}
                          loading={loading}
                          htmlType="submit"
                          className={styles.on_hover}
                        >
                          {" "}
                          Update
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

export default EditDepartments;
