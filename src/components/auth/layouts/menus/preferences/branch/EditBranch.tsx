import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Input, Button, Space, Checkbox, Select } from 'antd';
import { FormOutlined, EyeOutlined } from '@ant-design/icons';
import classnames from 'classnames';

import { updateBranch } from '../../../../../../store/actions/preferencesActions';
import { useDispatch } from 'react-redux';
import { useAxiosPrivate, useCleanUp } from '../../../../../../hooks';

import {
  useGetSystemCompany,
  useGetSystemUsers,
  useGetSystemBranch,
} from '../../../../../../store/actions/preferencesHooksActionsType';
import PreferencesHero from '../PreferencesHero';
import styles from '../../../../../styles/layout/Layout.module.css';
import AminatedLayout from '../../../../../ui/AminatedLayout';
import Avatar from 'react-avatar';
import { Company, Branch, User } from '../../../../../../@types/api.types';
import { useCustomForm } from '../../../../../../util/hookstype';
import GeneralBackButton from '../../../../../ui/GeneralBackButton';
import { FaBuildingUser } from 'react-icons/fa6';

const { Option } = Select;

interface FormValues {
  branch_id: number;
  name: string;
  company_id: number | string;
  address: string;
  email: string;
  code: string;
  phone_1: string;
  phone_2: string;
  headquarters: boolean | undefined;
  branch_managers: number[] | null;
}

function EditBranch() {
  useCleanUp();
  const [loading, setLoading] = useState(false);
  const [enableduser, setEnabledUser] = useState(true);
  const [enabledcompany, setEnabledCompany] = useState(true);
  const [enabledbranch, setEnabledBranch] = useState(true);
  const [all_company, setAllCompany] = useState<Company[] | undefined>(
    undefined,
  );
  const [all_users, setAllUsers] = useState<User[] | undefined>(undefined);
  const [selected, setSelected] = useState<Branch | null>(null);

  const { id } = useParams();
  const dispatch = useDispatch();
  const request = useAxiosPrivate();

  const { data: company_data } = useGetSystemCompany(
    enabledcompany,
    setEnabledCompany,
    'all',
  );
  const { data: user_data } = useGetSystemUsers(enableduser, setEnabledUser);
  const { data: branch_data } = useGetSystemBranch(
    enabledbranch,
    setEnabledBranch,
    'all',
  );

  // Effect to set selected branch when data changes
  useEffect(() => {
    if (branch_data && Object.keys(branch_data).length) {
      const branchs = branch_data?.payload?.branchs || [];
      const selectbranch = branchs.find((item) => item.id === parseInt(id));
      setSelected(selectbranch || null);
    }
  }, [branch_data, id]);

  const initValues: FormValues = {
    branch_id: parseInt(id),
    name: selected?.name || '',
    company_id: selected?.company_id || '',
    address: selected?.address || '',
    email: selected?.email || '',
    code: selected?.code || '',
    phone_1: selected?.phone_1 || '',
    phone_2: selected?.phone_2 || '',
    headquarters: selected?.headquarters || undefined,
    branch_managers: selected?.managers.map((item) => item.id) || null,
  };

  //callback
  function updateBranchCallback() {
    setLoading(true);
    updateBranch(dispatch, request, values).then((res) => {
      setLoading(false);
    });
  }

  //Validation

  function validateEditBranch(
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

    return errors;
  }

  const { values, errors, handleChange, handleSubmit, clearForm } =
    useCustomForm(updateBranchCallback, initValues, validateEditBranch);

  // Effect to update form values when selected gender changes
  useEffect(() => {
    if (selected) {
      clearForm();
      values.name = selected?.name;
      values.company_id = selected?.company_id;
      values.address = selected?.address;
      values.email = selected?.email;
      values.code = selected?.code;
      values.phone_1 = selected?.phone_1;
      values.phone_2 = selected?.phone_2;
      values.headquarters = selected?.headquarters;
      values.branch_managers = selected?.managers.map((item) => item.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  useEffect(() => {
    if (company_data && Object.keys(company_data).length) {
      const all_company = company_data?.payload?.companys;
      setAllCompany(all_company);
    }
  }, [company_data]);

  useEffect(() => {
    if (user_data && Object.keys(user_data).length) {
      const all_users = user_data?.payload?.system_users;
      setAllUsers(all_users);
    }
  }, [user_data]);

  // eslint-disable-next-line
  // useEffect(() => {
  //   if (!selected) {
  //     history.push('/preferences/view-branches');
  //   }
  // }, [selected, history]);

  console.log({ branch_data, values, selected });

  return (
    <>
      <PreferencesHero />
      {/* Content Header (Page header) */}

      <AminatedLayout>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Edit Branch</h1>
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
                    Update branch
                  </span>
                </h3>
                <div className="card-tools">
                  <GeneralBackButton />
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="card-body">
                  <div className="row">
                    <div className="form-group col-md-4 ">
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
                    <div className="form-group col-md-4 ">
                      <label htmlFor="email">Email </label>
                      <Input
                        type="text"
                        name="email"
                        id="email"
                        allowClear
                        value={values.email}
                        onChange={handleChange}
                        status={errors.email ? 'error' : ''}
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
                    <div className="form-group col-md-4 ">
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

                    <div className="form-group col-md-4 ">
                      <label htmlFor="phone_1">Phone 1 </label>
                      <Input
                        type="text"
                        name="phone_1"
                        id="phone_1"
                        allowClear
                        value={values.phone_1}
                        onChange={handleChange}
                        status={errors.phone_1 ? 'error' : ''}
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
                    <div className="form-group col-md-4 ">
                      <label htmlFor="phone_2">Phone 2 </label>
                      <Input
                        type="text"
                        name="phone_2"
                        id="phone_2"
                        allowClear
                        value={values.phone_2}
                        onChange={handleChange}
                        status={errors.phone_2 ? 'error' : ''}
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
                    <div className="form-group col-md-4 ">
                      <label htmlFor="code">Code </label>
                      <Input
                        type="text"
                        name="code"
                        id="code"
                        allowClear
                        value={values.code}
                        onChange={handleChange}
                        status={errors.code ? 'error' : ''}
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

                    <div className="form-group col-md-4 pt-md-3">
                      <Checkbox
                        checked={values?.headquarters}
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
                        Checking this field makes this branch an headquarter for
                        the selected company.
                      </div>
                    </div>

                    <div className="form-group col-md-4">
                      <label htmlFor="name">
                        Company <span className="text-danger">*</span>
                      </label>
                      <Select
                        style={{
                          width: '100%',
                        }}
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
                        value={values.company_id}
                      >
                        {all_company &&
                          all_company.map((company) => (
                            <Option key={company.id} value={company.id}>
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
                    <div className="form-group col-md-4">
                      <label htmlFor="branch_managers">Branch managers</label>
                      <Select
                        style={{
                          width: '100%',
                        }}
                        showSearch
                        status={errors.branch_managers ? 'error' : ''}
                        id="branch_managers"
                        mode="multiple"
                        allowClear
                        value={values.branch_managers}
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
                          all_users.map((user) => (
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

                  <div className="row">
                    <div className="form-group col-md-6 ">
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
                        <Link to="/preferences/view-branches">
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

export default EditBranch;
