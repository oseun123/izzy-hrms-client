import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input, Button, Space } from 'antd';
import { PlusCircleOutlined, EyeOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import { createState } from '../../../../../../store/actions/preferencesActions';
import { useDispatch } from 'react-redux';
import { useAxiosPrivate, useCleanUp } from '../../../../../../hooks';
import { useCustomForm } from '../../../../../../util/hookstype';
import PreferencesHero from '../PreferencesHero';
import styles from '../../../../../styles/layout/Layout.module.css';
import AminatedLayout from '../../../../../ui/AminatedLayout';
import GeneralBackButton from '../../../../../ui/GeneralBackButton';
import { AiOutlineEnvironment } from 'react-icons/ai';

interface FormValues {
  name: string;
}

interface CreateStatesProps {
  drawer: boolean;
  onClose: () => void;
}

function CreateStates({ drawer, onClose }: CreateStatesProps) {
  useCleanUp();
  const dispatch = useDispatch();
  const request = useAxiosPrivate();
  const [loading, setLoading] = useState(false);

  const initValues: FormValues = {
    name: '',
  };

  //callback
  function createStateCallback() {
    setLoading(true);
    createState(dispatch, request, values).then((res) => {
      setLoading(false);
      if (res?.status === 'success') {
        clearForm();
      }
    });
  }

  // Validation function
  function validateCreateState(
    values: FormValues,
  ): Record<string, string | undefined> {
    const errors: Record<string, string | undefined> = {};
    if (!values.name.trim()) {
      errors.name = 'Name is required';
    }
    return errors;
  }

  const { values, errors, handleChange, handleSubmit, clearForm } =
    useCustomForm(createStateCallback, initValues, validateCreateState);

  return (
    <>
      <PreferencesHero />
      <AminatedLayout>
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Create State</h1>
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
                    Add new state
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
                          icon={<PlusCircleOutlined />}
                          loading={loading}
                          htmlType="submit"
                          className={styles.on_hover}
                        >
                          {' '}
                          Create
                        </Button>
                        {!drawer ? (
                          <Link to="/preferences/view-states">
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
                            icon="X"
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

export default CreateStates;
