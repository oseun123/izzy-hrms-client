import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input, Button, Space } from 'antd';
import { PlusCircleOutlined, EyeOutlined } from '@ant-design/icons';
import classnames from 'classnames';

import { createEmployeeCategory } from '../../../../../../store/actions/preferencesActions';
import { useDispatch } from 'react-redux';
import { useAxiosPrivate, useCleanUp } from '../../../../../../hooks';
import PreferencesHero from '../PreferencesHero';
import styles from '../../../../../styles/layout/Layout.module.css';
import AminatedLayout from '../../../../../ui/AminatedLayout';
import { FaGraduationCap } from 'react-icons/fa6';
import { useCustomForm } from '../../../../../../util/hookstype';
import GeneralBackButton from '../../../../../ui/GeneralBackButton';

interface FormValues {
  name: string;
}

interface CreateEmpCategoryProps {
  drawer: boolean;
  onClose: () => void;
}

function CreateEmpCategory({ drawer, onClose }: CreateEmpCategoryProps) {
  useCleanUp();
  const dispatch = useDispatch();
  const request = useAxiosPrivate();
  const [loading, setLoading] = useState(false);

  const initValues: FormValues = {
    name: '',
  };

  // Validation function
  function validateCreateEmpCategory(
    values: FormValues,
  ): Record<string, string | undefined> {
    const errors: Record<string, string | undefined> = {};
    if (!values.name.trim()) {
      errors.name = 'Name is required';
    }
    return errors;
  }

  //callback
  function createEmpCategoryCallback() {
    setLoading(true);
    createEmployeeCategory(dispatch, request, values).then((res) => {
      setLoading(false);
      if (res?.status === 'success') {
        clearForm();
      }
    });
  }

  const { values, errors, handleChange, handleSubmit, clearForm } =
    useCustomForm(
      createEmpCategoryCallback,
      initValues,
      validateCreateEmpCategory,
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
                <h1>Create Employee Category</h1>
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
                    Add new employee category
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
                          icon={<PlusCircleOutlined />}
                          loading={loading}
                          htmlType="submit"
                          className={styles.on_hover}
                        >
                          {' '}
                          Create
                        </Button>

                        {!drawer ? (
                          <Link to="/preferences/view-employee-category">
                            <Button
                              icon={<EyeOutlined />}
                              className={styles.on_hover_secondary}
                            >
                              {' '}
                              View
                            </Button>
                          </Link>
                        ) : null}

                        {drawer ? (
                          <Button
                            icon={'X'}
                            className={styles.on_hover_secondary}
                            onClick={onClose}
                          >
                            {' '}
                            Close
                          </Button>
                        ) : null}
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

export default CreateEmpCategory;
