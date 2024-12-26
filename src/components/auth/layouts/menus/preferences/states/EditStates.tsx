import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Input, Button, Space } from 'antd';
import { FormOutlined, EyeOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import { updateState } from '../../../../../../store/actions/preferencesActions';
import { useGetSystemState } from '../../../../../../store/actions/preferencesHooksActionsType';
import { useDispatch } from 'react-redux';
import { useAxiosPrivate, useCleanUp } from '../../../../../../hooks';

import PreferencesHero from '../PreferencesHero';
import styles from '../../../../../styles/layout/Layout.module.css';
import AminatedLayout from '../../../../../ui/AminatedLayout';
import { State } from '../../../../../../@types/api.types';
import { useCustomForm } from '../../../../../../util/hookstype';
import GeneralBackButton from '../../../../../ui/GeneralBackButton';
import { AiOutlineEnvironment } from 'react-icons/ai';

interface FormValues {
  state_id: number;
  name: string;
}

function EditStates() {
  useCleanUp();
  const [enabled, setEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<State | null>(null);

  const dispatch = useDispatch();
  const request = useAxiosPrivate();

  const { id } = useParams();
  const { data } = useGetSystemState(enabled, setEnabled, 'all');

  // Effect to set selected gender when data changes
  useEffect(() => {
    if (data && Object.keys(data).length) {
      const states = data.payload?.states || [];
      const selectstate = states.find((item) => item.id === parseInt(id));
      setSelected(selectstate || null);
    }
  }, [data, id]);

  const initValues: FormValues = {
    state_id: parseInt(id),
    name: selected?.name || '',
  };

  //callback
  function updatestateCallback() {
    setLoading(true);
    updateState(dispatch, request, values).then(() => {
      setLoading(false);
    });
  }

  // Validation function for the form
  function validateEditState(
    values: FormValues,
  ): Record<string, string | undefined> {
    const errors: Record<string, string | undefined> = {};
    if (!values.name.trim()) {
      errors.name = 'Name is required';
    }
    return errors;
  }

  const { values, errors, handleChange, handleSubmit, clearForm } =
    useCustomForm(updatestateCallback, initValues, validateEditState);

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
                <h1>Edit State</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Preferences</li>
                  <li className="breadcrumb-item active">State</li>
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
                    <AiOutlineEnvironment />
                    Update state
                  </span>
                </h3>
                <div className="card-tools">
                  <GeneralBackButton />
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="card-body">
                  <div className="row">
                    <div className="form-group col-md-4 offset-md-4 d-flex flex-column">
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
                        placeholder="Name of state"
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
                          loading={loading}
                          htmlType="submit"
                          className={styles.on_hover}
                        >
                          {' '}
                          Update
                        </Button>
                        <Link to="/preferences/view-states">
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

export default EditStates;
