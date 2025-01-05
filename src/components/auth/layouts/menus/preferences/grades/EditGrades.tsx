import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Input, Button, Space } from 'antd';
import { FormOutlined, EyeOutlined } from '@ant-design/icons';
import classnames from 'classnames';

import { updateGrade } from '../../../../../../store/actions/preferencesActions';
import { useDispatch } from 'react-redux';
import { useAxiosPrivate, useCleanUp } from '../../../../../../hooks';

import PreferencesHero from '../PreferencesHero';
import styles from '../../../../../styles/layout/Layout.module.css';
import AminatedLayout from '../../../../../ui/AminatedLayout';
import { useGetSystemGrade } from '../../../../../../store/actions/preferencesHooksActionsType';
import { Grade } from '../../../../../../@types/api.types';
import { useCustomForm } from '../../../../../../util/hookstype';
import GeneralBackButton from '../../../../../ui/GeneralBackButton';
import { SiLevelsdotfyi } from 'react-icons/si';

interface FormValues {
  grade_id: number;
  name: string;
}

function EditGrades() {
  useCleanUp();
  const [loading, setLoading] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [selected, setSelected] = useState<Grade | null>(null);

  const { id } = useParams();
  const request = useAxiosPrivate();
  const dispatch = useDispatch();

  const { data, isLoading } = useGetSystemGrade(enabled, setEnabled, 'all');

  // Effect to set selected designation when data changes
  useEffect(() => {
    if (data && Object.keys(data).length) {
      const grades = data.payload?.grades || [];
      const selected = grades.find((item) => item.id === parseInt(id));
      setSelected(selected || null);
    }
  }, [data, id]);

  // Initial form values based on selected designation
  const initValues: FormValues = {
    grade_id: parseInt(id),
    name: selected?.name || '',
  };

  //callback
  function editGradeCallback() {
    setLoading(true);
    updateGrade(dispatch, request, values).then((res) => {
      setLoading(false);
    });
  }

  //validation

  function validateeditGrade(
    values: FormValues,
  ): Record<string, string | undefined> {
    const errors: Record<string, string | undefined> = {};
    if (!values.name.trim()) {
      errors.name = 'Name is required';
    }
    return errors;
  }

  const { values, errors, handleSubmit, clearForm, handleChange } =
    useCustomForm(editGradeCallback, initValues, validateeditGrade);

  // Effect to update form values when selected gender changes
  useEffect(() => {
    if (selected) {
      clearForm();
      values.name = selected.name; // Update form value directly
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  //   console.log({ selected, values, data });

  return (
    <>
      <PreferencesHero />

      <AminatedLayout>
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Edit Grade</h1>
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
                    <SiLevelsdotfyi />
                    Update grade
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
                        placeholder="Name of grade"
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
                        <Link to="/preferences/view-grades">
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

export default EditGrades;
