import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Input, Button, Space } from 'antd';
import { FormOutlined, EyeOutlined } from '@ant-design/icons';
import classnames from 'classnames';

import { updateDesignation } from '../../../../../../store/actions/preferencesActions';
import { useDispatch } from 'react-redux';
import { useAxiosPrivate, useCleanUp } from '../../../../../../hooks';

import PreferencesHero from '../PreferencesHero';
import styles from '../../../../../styles/layout/Layout.module.css';
import AminatedLayout from '../../../../../ui/AminatedLayout';
import { useGetSystemDesignation } from '../../../../../../store/actions/preferencesHooksActionsType';
import { Designation } from '../../../../../../@types/api.types';
import { useCustomForm } from '../../../../../../util/hookstype';
import GeneralBackButton from '../../../../../ui/GeneralBackButton';
import { MdWorkOutline } from 'react-icons/md';

interface FormValues {
  designation_id: number;
  name: string;
}

function EditDesignation() {
  useCleanUp();
  const [loading, setLoading] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [selected, setSelected] = useState<Designation | null>(null);

  const { id } = useParams();
  const request = useAxiosPrivate();
  const dispatch = useDispatch();

  const { data, isLoading } = useGetSystemDesignation(
    enabled,
    setEnabled,
    'all',
  );

  // Effect to set selected designation when data changes
  useEffect(() => {
    if (data && Object.keys(data).length) {
      const designations = data.payload?.designations || [];
      const selectedDesignation = designations.find(
        (item) => item.id === parseInt(id),
      );
      setSelected(selectedDesignation || null);
    }
  }, [data, id]);

  // Initial form values based on selected designation
  const initValues: FormValues = {
    designation_id: parseInt(id),
    name: selected?.name || '',
  };

  //callback
  function editDesginationCallback() {
    setLoading(true);
    updateDesignation(dispatch, request, values).then((res) => {
      setLoading(false);
    });
  }

  //validation

  function validateeditDesignation(
    values: FormValues,
  ): Record<string, string | undefined> {
    const errors: Record<string, string | undefined> = {};
    if (!values.name.trim()) {
      errors.name = 'Name is required';
    }
    return errors;
  }

  const { values, errors, handleSubmit, clearForm, handleChange } =
    useCustomForm(editDesginationCallback, initValues, validateeditDesignation);

  // Effect to update form values when selected gender changes
  useEffect(() => {
    if (selected) {
      clearForm();
      values.name = selected.name; // Update form value directly
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  console.log({ selected, values, data });

  return (
    <>
      <PreferencesHero />

      <AminatedLayout>
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Edit Designation</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Preferences</li>
                  <li className="breadcrumb-item active">Designation</li>
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
                    <MdWorkOutline />
                    Update designation
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
                        placeholder="Name of designation"
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
                        <Link to="/preferences/view-designation">
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

export default EditDesignation;
