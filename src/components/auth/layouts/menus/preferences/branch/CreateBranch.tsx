import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Input, Button, Space, Checkbox, Select } from 'antd';
import { PlusCircleOutlined, EyeOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import { createBranch } from '../../../../../../store/actions/preferencesActions';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useAxiosPrivate, useCleanUp } from '../../../../../../hooks';

import {
  useGetSystemCompany,
  useGetSystemUsers,
} from '../../../../../../store/actions/preferencesHooksActionsType';
import PreferencesHero from '../PreferencesHero';
import AminatedLayout from '../../../../../ui/AminatedLayout';
import styles from '../../../../../styles/layout/Layout.module.css';
import Avatar from 'react-avatar';
import { Company, User } from '../../../../../../@types/api.types';

import { useCustomForm } from '../../../../../../util/hookstype';
import GeneralBackButton from '../../../../../ui/GeneralBackButton';
import { FaBuildingUser } from 'react-icons/fa6';

const { Option } = Select;

interface FormValues {
  name: string;
  company_id: number | string;
  address: string;
  email: string;
  code: string;
  phone_1: string;
  phone_2: string;
  headquarters: boolean;
  branch_managers: User[];
}

interface CreateBranchProps {
  drawer: boolean;
  onClose: () => void;
}

function CreateBranch({ drawer, onClose }: CreateBranchProps) {
  useCleanUp();

  const dispatch = useDispatch();
  const request = useAxiosPrivate();
  const [loading, setLoading] = useState(false);
  const [enableduser, setEnabledUser] = useState(true);
  const [enabledcompany, setEnabledCompany] = useState(true);
  const [all_company, setAllCompany] = useState([]);
  const [all_users, setAllUsers] = useState([]);

  useGetSystemCompany(enabledcompany, setEnabledCompany, 'all');
  useGetSystemUsers(enableduser, setEnabledUser);

  const companys = useSelector(
    // @ts-ignore
    (state) => state.preferences.system_companys,
    shallowEqual,
  );
  const users = useSelector(
    // @ts-ignore
    (state) => state.preferences.system_users,
    shallowEqual,
  );

  const initValues: FormValues = {
    name: '',
    company_id: '',
    address: '',
    email: '',
    code: '',
    phone_1: '',
    phone_2: '',
    headquarters: false,
    branch_managers: [],
  };

  function validateCreateBranch(
    values: FormValues,
  ): Record<string, string | undefined> {
    let errors: Record<string, string | undefined> = {};

    if (values.hasOwnProperty('name') && values.name.trim() === '') {
      errors.name = 'Name cannot not be empty.';
    }
    if (values.hasOwnProperty('address') && values.address.trim() === '') {
      errors.address = 'Address cannot not be empty.';
    }
    if (values.hasOwnProperty('company_id') && values.company_id === '') {
      errors.company_id = ' Company cannot be empty.';
    }
    if (
      values.hasOwnProperty('branch_managers') &&
      values.branch_managers.length === 0
    ) {
      errors.branch_managers = 'Branch managers cannot be empty.';
    }

    return errors;
  }

  //callback
  function createBranchCallback() {
    setLoading(true);
    createBranch(dispatch, request, values).then((res) => {
      setLoading(false);
      if (res?.status === 'success') {
        clearForm();
      }
    });
  }

  const { values, errors, handleChange, handleSubmit, clearForm } =
    useCustomForm(createBranchCallback, initValues, validateCreateBranch);

  useEffect(() => {
    setAllCompany(companys);
  }, [companys]);

  useEffect(() => {
    setAllUsers(users);
  }, [users]);

  return (
    <>
      <PreferencesHero />
      <AminatedLayout>
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Create Branch</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Preferences</li>
                  <li className="breadcrumb-item active">Branch</li>
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
                    <FaBuildingUser />
                    Add new branch
                  </span>
                </h3>
                <div className="card-tools">
                  <GeneralBackButton />
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="card-body">
                  <div className="row ">
                    <div className="form-group col-md-4  d-flex flex-column">
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
                        placeholder="Name of branch"
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
                    <div className="form-group col-md-4 d-flex flex-column ">
                      <label htmlFor="email">Email </label>
                      <Input
                        type="text"
                        name="email"
                        id="email"
                        allowClear
                        value={values.email}
                        onChange={handleChange}
                        status={errors.email ? 'error' : ''}
                        className="w-75"
                        placeholder="Email of branch"
                      />

                      <div
                        className={classnames(
                          'invalid-feedback',
                          'custom-feedback',
                          {
                            'custom-visibible': errors.email,
                          },
                        )}
                      >
                        {errors.email}
                      </div>
                    </div>
                    <div className="form-group col-md-4 d-flex flex-column ">
                      <label htmlFor="address">
                        Address <span className="text-danger">*</span>{' '}
                      </label>
                      <Input.TextArea
                        name="address"
                        id="address"
                        allowClear
                        value={values.address}
                        onChange={handleChange}
                        status={errors.address ? 'error' : ''}
                        className="w-75"
                        placeholder="Address of branch"
                      />

                      <div
                        className={classnames(
                          'invalid-feedback',
                          'custom-feedback',
                          {
                            'custom-visibible': errors.address,
                          },
                        )}
                      >
                        {errors.address}
                      </div>
                    </div>

                    <div className="form-group col-md-4   d-flex flex-column ">
                      <label htmlFor="phone_1">Phone 1 </label>
                      <Input
                        type="text"
                        name="phone_1"
                        id="phone_1"
                        allowClear
                        value={values.phone_1}
                        onChange={handleChange}
                        status={errors.phone_1 ? 'error' : ''}
                        className="w-75"
                        placeholder="Primary phone number"
                      />

                      <div
                        className={classnames(
                          'invalid-feedback',
                          'custom-feedback',
                          {
                            'custom-visibible': errors.phone_1,
                          },
                        )}
                      >
                        {errors.phone_1}
                      </div>
                    </div>
                    <div className="form-group col-md-4  d-flex flex-column ">
                      <label htmlFor="phone_2">Phone 2 </label>
                      <Input
                        type="text"
                        name="phone_2"
                        id="phone_2"
                        allowClear
                        value={values.phone_2}
                        onChange={handleChange}
                        status={errors.phone_2 ? 'error' : ''}
                        className="w-75"
                        placeholder="Secondary phone number"
                      />

                      <div
                        className={classnames(
                          'invalid-feedback',
                          'custom-feedback',
                          {
                            'custom-visibible': errors.phone_2,
                          },
                        )}
                      >
                        {errors.phone_2}
                      </div>
                    </div>
                    <div className="form-group col-md-4  d-flex flex-column">
                      <label htmlFor="code">RC Number </label>
                      <Input
                        type="text"
                        name="code"
                        id="code"
                        allowClear
                        value={values.code}
                        onChange={handleChange}
                        status={errors.code ? 'error' : ''}
                        className="w-75"
                        placeholder="Rc number of branch"
                      />

                      <div
                        className={classnames(
                          'invalid-feedback',
                          'custom-feedback',
                          {
                            'custom-visibible': errors.code,
                          },
                        )}
                      >
                        {errors.code}
                      </div>
                    </div>

                    <div className="form-group col-md-4 pt-md-3 ">
                      <Checkbox
                        checked={values.headquarters}
                        name="headquarters"
                        onChange={(e) =>
                          handleChange({
                            name: 'headquarters',
                            value: e.target.checked,
                          })
                        }
                      >
                        Make branch headquarter
                      </Checkbox>
                      <div>
                        <i className="fa fa-info-circle text-info mr-1"></i>
                        <i>
                          Checking this field makes this branch an headquarter
                          for the selected company.
                        </i>
                      </div>
                    </div>

                    <div className="form-group col-md-4 d-flex flex-column">
                      <label htmlFor="name">
                        Company <span className="text-danger">*</span>
                      </label>
                      <Select
                        showSearch
                        status={errors.company_id ? 'error' : ''}
                        id="company_id"
                        allowClear
                        onChange={(value) =>
                          handleChange({ name: 'company_id', value })
                        }
                        filterOption={(input, option) => {
                          // Ensure option.label is a string before calling toLowerCase
                          const label = option?.label ?? '';
                          return (
                            typeof label === 'string' &&
                            label.toLowerCase().includes(input.toLowerCase())
                          );
                        }}
                        value={values.company_id || null}
                        placeholder="Company of branch"
                        className="w-75"
                      >
                        {all_company &&
                          all_company.map((company: Company) => (
                            <Option
                              key={company.id}
                              value={company.id}
                              label={company.name}
                            >
                              {' '}
                              {company.name}
                            </Option>
                          ))}
                      </Select>

                      <div
                        className={classnames(
                          'invalid-feedback',
                          'custom-feedback',
                          {
                            'custom-visibible': errors.company_id,
                          },
                        )}
                      >
                        {errors.company_id}
                      </div>
                    </div>
                    <div className="form-group col-md-4 d-flex flex-column">
                      <label htmlFor="branch_managers">
                        Branch managers <span className="text-danger">*</span>
                      </label>
                      <Select
                        className="w-75"
                        placeholder="Branch contact person(s)"
                        showSearch
                        status={errors.branch_managers ? 'error' : ''}
                        id="branch_managers"
                        mode="multiple"
                        allowClear
                        value={
                          values.branch_managers.length
                            ? values.branch_managers
                            : null
                        }
                        onChange={(value) =>
                          handleChange({ name: 'branch_managers', value })
                        }
                        filterOption={(input, option) => {
                          // Ensure option.label is a string before calling toLowerCase
                          const label = option?.label ?? '';
                          return (
                            typeof label === 'string' &&
                            label.toLowerCase().includes(input.toLowerCase())
                          );
                        }}
                      >
                        {all_users &&
                          all_users.map((user: User) => (
                            <Option
                              key={user.id}
                              value={user.id}
                              label={`${user.first_name} ${user.last_name}`}
                            >
                              {' '}
                              <Space>
                                <Avatar
                                  name={`${user.first_name || ''} ${
                                    user.last_name || ' '
                                  }`}
                                  size="25"
                                  round={true}
                                />
                                <span>
                                  {user.first_name} {user.last_name}
                                </span>
                              </Space>
                            </Option>
                          ))}
                      </Select>

                      <div
                        className={classnames(
                          'invalid-feedback',
                          'custom-feedback',
                          {
                            'custom-visibible': errors.branch_managers,
                          },
                        )}
                      >
                        {errors.branch_managers}
                      </div>
                    </div>
                  </div>

                  <div className="row mt-4">
                    <div className="form-group col-md-12 ">
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
                          <Link to="/preferences/view-branches">
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

export default CreateBranch;
