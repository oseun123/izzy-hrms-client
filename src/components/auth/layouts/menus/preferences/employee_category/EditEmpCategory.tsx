import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Input, Button, Space } from 'antd';
import { FormOutlined, EyeOutlined } from '@ant-design/icons';
import classnames from 'classnames';

import { updateEmpCategory } from '../../../../../../store/actions/preferencesActions';
import { useDispatch } from 'react-redux';
import { useAxiosPrivate, useCleanUp } from '../../../../../../hooks';

import PreferencesHero from '../PreferencesHero';
import styles from '../../../../../styles/layout/Layout.module.css';
import AminatedLayout from '../../../../../ui/AminatedLayout';
import { useGetSystemEmpCategory } from '../../../../../../store/actions/preferencesHooksActionsType';
import { EmployeeCategory } from '../../../../../../@types/api.types';
import { useCustomForm } from '../../../../../../util/hookstype';
import GeneralBackButton from '../../../../../ui/GeneralBackButton';
import { FaGraduationCap } from 'react-icons/fa6';

interface FormValues {
  emp_cat_id: number;
  name: string;
}
function EditEmpCategory() {
  useCleanUp();
  const { id } = useParams();
  const [enabled, setEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<EmployeeCategory | null>(null);

  const { isLoading, data } = useGetSystemEmpCategory(
    enabled,
    setEnabled,
    'all',
  );
  const dispatch = useDispatch();
  const request = useAxiosPrivate();

  const initValues: FormValues = {
    emp_cat_id: parseInt(id),
    name: selected?.name || '',
  };

  // Effect to set selected gender when data changes
  useEffect(() => {
    if (data && Object.keys(data).length) {
      const empCat = data.payload?.employeeCategory || [];
      const selectedEmpCat = empCat.find((item) => item.id === parseInt(id));
      setSelected(selectedEmpCat || null);
    }
  }, [data, id]);

  //callback
  function editEmpCategoryCallback() {
    setLoading(true);
    updateEmpCategory(dispatch, request, values).then(() => {
      setLoading(false);
    });
  }

  //validation

  function validateeditEmpCategory(
    values: FormValues,
  ): Record<string, string | undefined> {
    const errors: Record<string, string | undefined> = {};
    if (!values.name.trim()) {
      errors.name = 'Name is required';
    }
    return errors;
  }

  const { values, errors, handleChange, handleSubmit, clearForm } =
    useCustomForm(editEmpCategoryCallback, initValues, validateeditEmpCategory);

  // Effect to update form values when selected gender changes
  useEffect(() => {
    if (selected) {
      clearForm();
      values.name = selected.name; // Update form value directly
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

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
                <h3 className="card-title">
                  <span className="space__align">
                    <FaGraduationCap />
                    Update employee category
                  </span>
                </h3>
                <div className="card-tools">
                  <GeneralBackButton />
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="card-body">
                  <div className="row">
                    <div className="form-group col-md-4 offset-md-4 d-flex flex-column ">
                      <label htmlFor="name">
                        Name <span className="text-danger">*</span>{' '}
                      </label>
                      <Input
                        type="text"
                        name="name"
                        id="name"
                        allowClear
                        value={values.name}
                        onChange={handleChange}
                        status={errors.name ? 'error' : ''}
                        className="w-75"
                        placeholder="Name of employee category"
                      />

                      <div
                        className={classnames(
                          'invalid-feedback',
                          'custom-feedback',
                          {
                            'custom-visibible': errors.name,
                          },
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
                          loading={loading || isLoading}
                          htmlType="submit"
                          className={styles.on_hover}
                        >
                          {' '}
                          Update
                        </Button>
                        <Link to="/preferences/view-employee-category">
                          <Button
                            icon={<EyeOutlined />}
                            className={styles.on_hover_secondary}
                          >
                            {' '}
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
