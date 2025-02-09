import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input, Button, Space } from 'antd';
import { PlusCircleOutlined, EyeOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import { createGrade } from '../../../../../../store/actions/preferencesActions';
import { useDispatch } from 'react-redux';
import { useAxiosPrivate, useCleanUp } from '../../../../../../hooks';

import PreferencesHero from '../PreferencesHero';
import styles from '../../../../../styles/layout/Layout.module.css';
import AminatedLayout from '../../../../../ui/AminatedLayout';
import { useCustomForm } from '../../../../../../util/hookstype';
import GeneralBackButton from '../../../../../ui/GeneralBackButton';
import { SiLevelsdotfyi } from 'react-icons/si';

interface FormValues {
  name: string;
}

interface CreateGradesProps {
  drawer: boolean;
  onClose: () => void;
}

function CreateGrades({ drawer, onClose }: CreateGradesProps) {
  useCleanUp();
  const dispatch = useDispatch();
  const request = useAxiosPrivate();
  const [loading, setLoading] = useState<boolean>(false);

  // Initial form values
  const initValues: FormValues = { name: '' };

  // Validation function
  const validatecreateGrade = (
    values: FormValues,
  ): Record<string, string | undefined> => {
    const errors: Record<string, string | undefined> = {};
    if (!values.name.trim()) {
      errors.name = 'Name is required';
    }
    return errors;
  };

  // Callback for creating a grade
  const createGradeCallback = () => {
    setLoading(true);
    createGrade(dispatch, request, values).then((res) => {
      setLoading(false);
      if (res?.status === 'success') {
        clearForm(); // Clear the form after successful creation
      }
    });
  };

  // Use the custom form hook
  const { values, errors, handleChange, handleSubmit, clearForm } =
    useCustomForm(createGradeCallback, initValues, validatecreateGrade);

  return (
    <>
      <PreferencesHero />
      <AminatedLayout>
        {/* Content Header */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Create Grades</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Preferences</li>
                  <li className="breadcrumb-item active">Grade</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="content col-md-12">
          <div className="container-fluid">
            {/* Default Box */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">
                  <span className="space__align">
                    <SiLevelsdotfyi />
                    Add new grade
                  </span>
                </h3>
                <div className="card-tools">
                  <GeneralBackButton />
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="card-body">
                  <div className="row">
                    <div className="form-group col-md-4 d-flex flex-column offset-md-4">
                      <label htmlFor="name">
                        Name <span className="text-danger">*</span>
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
                        placeholder="Name of grade"
                      />
                      {errors.name && (
                        <div
                          className={classnames(
                            'invalid-feedback',
                            'custom-feedback',
                          )}
                        >
                          {errors.name}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
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
                          Create
                        </Button>
                        {!drawer ? (
                          <Link to="/preferences/view-grades">
                            <Button
                              icon={<EyeOutlined />}
                              className={styles.on_hover_secondary}
                            >
                              View
                            </Button>
                          </Link>
                        ) : null}

                        {drawer ? (
                          <Button
                            icon="X"
                            className={styles.on_hover_secondary}
                            onClick={onClose}
                          >
                            Close
                          </Button>
                        ) : null}
                      </Space>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </AminatedLayout>
    </>
  );
}

export default CreateGrades;
