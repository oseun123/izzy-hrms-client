import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Input, Button, Space } from "antd";
import { FormOutlined, EyeOutlined } from "@ant-design/icons";
import classnames from "classnames";


import {
  updateGender,
} from "../../../../../../store/actions/preferencesActions";
import { useGetSystemGender } from "../../../../../../store/actions/preferencesHooksActionsType";
import { useDispatch } from "react-redux";
import {
  
  useAxiosPrivate,
  useCleanUp,
} from "../../../../../../hooks";


import PreferencesHero from "../PreferencesHero";
import styles from "../../../../../styles/layout/Layout.module.css";
import AminatedLayout from "../../../../../ui/AminatedLayout";
import { Gender } from "../../../../../../@types/api.types";
import { useCustomForm } from "../../../../../../util/hookstype";


interface FormValues {
  id: number,
  name: string;
}





function EditGenders() {
  useCleanUp();
  const [enabled, setEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Gender | null>(null);


  const { id } = useParams();
  const dispatch = useDispatch();
  const request = useAxiosPrivate();
  
  // Fetch system genders
  const { data } = useGetSystemGender(enabled, setEnabled, 'all');

 

  // Effect to set selected gender when data changes
  useEffect(() => {
    if (data && Object.keys(data).length) {
      const genders = data.payload?.genders || [];
      const selectedGender = genders.find((item) => item.id === parseInt(id));
      setSelected(selectedGender || null);
    }
  }, [data, id]);

  // Initial form values based on selected gender
  const initValues: FormValues = {
    id: parseInt(id),
    name: selected?.name || '',
  };

  // Custom hook to manage form state and validation
  const { values, errors, handleChange, handleSubmit,clearForm } = useCustomForm(
    updateGenderCallback,
    initValues,
    validateEditGender
  );

  // Effect to update form values when selected gender changes
  useEffect(() => {
    if (selected) {
      clearForm();
      values.name = selected.name; // Update form value directly
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  // Validation function for the form
  function validateEditGender(values: FormValues): Record<string, string | undefined>  {
    const errors: Record<string, string | undefined>  = {};
    if (!values.name.trim()) {
      errors.name = "Name is required";
    }
    return errors;
  }

  // Callback to handle gender update
  function updateGenderCallback() {
    console.log({ values });
    setLoading(true);
    updateGender(dispatch, request, values).then(() => {
      setLoading(false);
      // Optionally redirect or show a success message here
    });
  }

  return (
    <>
      <PreferencesHero />
      <AminatedLayout>
        {/* Content Header (Page header) */}
        <section className="content-header">
         
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Edit Gender</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Preferences</li>
                  <li className="breadcrumb-item active">Gender</li>
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
                <h3 className="card-title">Edit a Gender</h3>
                <div className="card-tools"></div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="card-body">
                  <div className="row">
                    <div className="form-group col-md-4 d-flex flex-column offset-md-4">
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
                        // defaultValue={nam}
                        className="w-75"
                        placeholder="Name of gender"
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
                          loading={loading}
                          htmlType="submit"
                          className={styles.on_hover}
                        >
                          {" "}
                          Update
                        </Button>
                        <Link to="/preferences/view-genders">
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

export default EditGenders;
