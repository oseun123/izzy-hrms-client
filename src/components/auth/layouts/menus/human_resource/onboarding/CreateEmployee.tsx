import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Input, Button, Space, DatePicker, Select, Popconfirm } from 'antd';
import { PlusCircleOutlined, EyeOutlined } from '@ant-design/icons';
import classnames from 'classnames';

import { useDispatch } from 'react-redux';
import { useAxiosPrivate, useCleanUp } from '../../../../../../hooks';
import { createEmployee } from '../../../../../../store/actions/hrActions';
import HumanResourceHero from '../HumanResourceHero';
import AminatedLayout from '../../../../../ui/AminatedLayout';
import styles from '../../../../../styles/layout/Layout.module.css';
import { useCustomForm } from '../../../../../../util/hookstype';
import {
  useGetEmpNumber,
  useGetSystemBranch,
  useGetSystemCompany,
  useGetSystemCountry,
  useGetSystemDepartment,
  useGetSystemDesignation,
  useGetSystemEmpCategory,
  useGetSystemEmpStatus,
  useGetSystemGender,
  useGetSystemGrade,
  useGetSystemState,
  useGetSystemStep,
  useGetSystemUsers,
} from '../../../../../../store/actions/preferencesHooksActionsType';
import {
  Branch,
  Company,
  Country,
  Department,
  Designation,
  EmployeeCategory,
  EmployeeStatus,
  Gender,
  Grade,
  State,
  Step,
  User,
} from '../../../../../../@types/api.types';
import dayjs from 'dayjs';
import { IoIosAddCircleOutline } from 'react-icons/io';
import DepartmentDrawer from '../drawer/DepartmentDrawer';
import DesignationDrawer from '../drawer/DesignationDrawer';
import EmpCategoryDrawer from '../drawer/EmpCategoryDrawer';
import EmpStatusDrawer from '../drawer/EmpStatusDrawer';
import GradeDrawer from '../drawer/GradeDrawer';
import StepDrawer from '../drawer/StepDrawer';
import CompanyDrawer from '../drawer/CompanyDrawer';
import StateDrawer from '../drawer/StateDrawer';
import CountryDrawer from '../drawer/CountryDrawer';
import BranchDrawer from '../drawer/BranchDrawer';
const { Option } = Select;

interface FormValues {
  branch_id: number | null;
  company_id: number | null;
  country_id: number | null;
  department_id: number | null;
  designation_id: number | null;
  email: string;
  employeecategory_id: number | null;
  employeestatus_id: number | null;
  first_name: string;
  middle_name: string;
  gender_id: number | null;
  grade_id: number | null;
  step_id: number | null;
  last_name: string;
  employee_number: string;
  employment_date: string;
  primary_supervisor: number | null;
  secondary_supervisor: number | null;
  state_id: number | null;
}

function CreateEmployee() {
  useCleanUp();

  const [enabled_country, setEnabledCountry] = useState(true);
  const [enabled_state, setEnabledState] = useState(true);
  const [enabled_branch, setEnabledBranch] = useState(true);
  const [enabled_com, setEnabledCom] = useState(true);
  const [enabled_grade, setEnabledGrade] = useState(true);
  const [enabled_step, setEnabledStep] = useState(true);
  const [enabled_empCat, setEnabledEmpCat] = useState(true);
  const [enabled_empStatus, setEnabledEmpStatus] = useState(true);
  const [enabled_emp_des, setEnabledEmpDeS] = useState(true);
  const [enabled_emp_dept, setEnabledEmpDept] = useState(true);
  const [enabled_user, setEnabledUser] = useState(true);
  const [enabled_gender, setEnabledGender] = useState(true);
  const [enabled_num, setEnabledNum] = useState(true);
  const [loading, setLoading] = useState(false);
  const [filtered_branch_data, setFilteredBranch] = useState<Branch[]>();
  // Drawer
  const [open_dept, setOpenDept] = useState(false);
  const [open_desg, setOpenDesg] = useState(false);
  const [open_cat, setOpenCat] = useState(false);
  const [open_status, setOpenStatus] = useState(false);
  const [open_grade, setOpenGrade] = useState(false);
  const [open_step, setOpenStep] = useState(false);
  const [open_company, setOpenCompany] = useState(false);
  const [open_state, setOpenState] = useState(false);
  const [open_country, setOpenCountry] = useState(false);
  const [open_branch, setOpenBranch] = useState(false);

  const initValues: FormValues = {
    first_name: '',
    middle_name: '',
    last_name: '',
    employee_number: '',
    employment_date: '',
    department_id: null,
    grade_id: null,
    step_id: null,
    branch_id: null,
    company_id: null,
    designation_id: null,
    primary_supervisor: null,
    secondary_supervisor: null,
    employeestatus_id: null,
    employeecategory_id: null,
    email: '',
    country_id: null,
    state_id: null,
    gender_id: null,
  };

  const { data: country_data, isLoading: country_loading } =
    useGetSystemCountry(enabled_country, setEnabledCountry, 'all');

  const { data: state_data, isLoading: state_loading } = useGetSystemState(
    enabled_state,
    setEnabledState,
    'all',
  );
  const { data: branch_data, isLoading: branch_loading } = useGetSystemBranch(
    enabled_branch,
    setEnabledBranch,
    'all',
  );

  const { data: company_data, isLoading: company_loading } =
    useGetSystemCompany(enabled_com, setEnabledCom, 'all');

  const { data: grade_data, isLoading: grade_loading } = useGetSystemGrade(
    enabled_grade,
    setEnabledGrade,
    'all',
  );
  const { data: step_data, isLoading: step_loading } = useGetSystemStep(
    enabled_step,
    setEnabledStep,
    'all',
  );

  const { data: emp_cat_data, isLoading: cat_loading } =
    useGetSystemEmpCategory(enabled_empCat, setEnabledEmpCat, 'all');
  const { data: emp_status_data, isLoading: status_loading } =
    useGetSystemEmpStatus(enabled_empStatus, setEnabledEmpStatus, 'all');
  const { data: emp_des_data, isLoading: deg_loading } =
    useGetSystemDesignation(enabled_emp_des, setEnabledEmpDeS, 'all');
  const { data: emp_dept_data, isLoading: dept_loading } =
    useGetSystemDepartment(enabled_emp_dept, setEnabledEmpDept, 'all');

  const { data: gender_data, isLoading: gender_loading } = useGetSystemGender(
    enabled_gender,
    setEnabledGender,
    'all',
  );
  const { data: user_data, isLoading: user_loading } = useGetSystemUsers(
    enabled_user,
    setEnabledUser,
  );
  const { data: format_data, refetch } = useGetEmpNumber(
    enabled_num,
    setEnabledNum,
  );

  const request = useAxiosPrivate();
  const dispatch = useDispatch();

  function validateCreateEmployee(
    values: FormValues,
  ): Record<string, string | undefined> {
    let errors: Record<string, string | undefined> = {};

    if (
      values.hasOwnProperty('first_name') &&
      values.first_name.trim() === ''
    ) {
      errors.first_name = 'First name cannot be empty.';
    }
    if (
      values.hasOwnProperty('middle_name') &&
      values.middle_name.trim() === ''
    ) {
      errors.middle_name = 'Middle name cannot be empty.';
    }
    if (values.hasOwnProperty('last_name') && values.last_name.trim() === '') {
      errors.last_name = 'Last name cannot be empty.';
    }
    if (
      values.hasOwnProperty('employment_date') &&
      values.employment_date.trim() === ''
    ) {
      errors.employment_date = 'Employment date cannot be empty.';
    }
    if (
      values.hasOwnProperty('department_id') &&
      values.department_id == null
    ) {
      errors.department_id = 'Department cannot be empty.';
    }
    if (values.hasOwnProperty('grade_id') && values.grade_id == null) {
      errors.grade_id = 'Grade cannot be empty.';
    }
    if (values.hasOwnProperty('step_id') && values.step_id == null) {
      errors.step_id = 'Grade cannot be empty.';
    }
    if (values.hasOwnProperty('step_id') && values.step_id == null) {
      errors.step_id = 'Step cannot not be empty.';
    }
    if (values.hasOwnProperty('branch_id') && values.branch_id == null) {
      errors.branch_id = 'Branch cannot be empty.';
    }
    if (
      values.hasOwnProperty('designation_id') &&
      values.designation_id == null
    ) {
      errors.designation_id = 'Designation cannot be empty.';
    }

    if (
      values.hasOwnProperty('employeestatus_id') &&
      values.employeestatus_id == null
    ) {
      errors.employeestatus_id = 'Employment status cannot be empty.';
    }

    if (
      values.hasOwnProperty('employeecategory_id') &&
      values.employeecategory_id == null
    ) {
      errors.employeecategory_id = 'Employee category cannot be empty.';
    }

    if (values.hasOwnProperty('email') && values.email.trim() === '') {
      errors.email = 'Work email cannot be empty.';
    }

    if (values.hasOwnProperty('country_id') && values.country_id == null) {
      errors.country_id = 'Country cannot be empty.';
    }
    if (values.hasOwnProperty('state_id') && values.state_id == null) {
      errors.state_id = 'State cannot be empty.';
    }
    if (values.hasOwnProperty('gender_id') && values.gender_id == null) {
      errors.gender_id = 'Gender cannot be empty.';
    }

    return errors;
  }

  //callback

  function createEmployeeCallback() {
    setLoading(true);
    createEmployee(dispatch, request, values).then((res) => {
      if (res?.status === 'success') {
        clearForm();
        refetch();
      }
      setLoading(false);
    });
  }

  const { values, errors, handleChange, handleSubmit, clearForm } =
    useCustomForm(createEmployeeCallback, initValues, validateCreateEmployee);

  useEffect(() => {
    if (format_data?.payload.format_string) {
      values.employee_number = format_data?.payload.format_string;
    }
  }, [format_data, values]);

  useEffect(() => {
    if (values.company_id && branch_data && Object.keys(branch_data).length) {
      const filtered = branch_data.payload.branchs?.filter(
        (item) => item.company.id === values.company_id,
      );
      setFilteredBranch(filtered);
    }
  }, [values.company_id, branch_data]);

  // Drawers
  function toggleDrawerDept() {
    setOpenDept((prev) => !prev);
  }
  function toggleDrawerDesg() {
    setOpenDesg((prev) => !prev);
  }
  function toggleDrawerCat() {
    setOpenCat((prev) => !prev);
  }
  function toggleDrawerStatus() {
    setOpenStatus((prev) => !prev);
  }
  function toggleDrawerGrade() {
    setOpenGrade((prev) => !prev);
  }
  function toggleDrawerStep() {
    setOpenStep((prev) => !prev);
  }
  function toggleDrawerState() {
    setOpenState((prev) => !prev);
  }
  function toggleDrawerBranch() {
    setOpenBranch((prev) => !prev);
  }
  function toggleDrawerCompany() {
    setOpenCompany((prev) => !prev);
  }
  function toggleDrawerCountry() {
    setOpenCountry((prev) => !prev);
  }

  function refetchAll() {
    setEnabledEmpDept(true);
    setEnabledEmpDeS(true);
    setEnabledEmpCat(true);
    setEnabledEmpStatus(true);
    setEnabledGrade(true);
    setEnabledStep(true);
    setEnabledState(true);
    setEnabledBranch(true);
    setEnabledCom(true);
    setEnabledCountry(true);
  }

  function confirm() {
    const fakeEvent = {
      preventDefault: () => {},
    } as React.FormEvent<HTMLFormElement>;
    handleSubmit(fakeEvent);
  }
  function cancel() {}

  return (
    <>
      <HumanResourceHero />
      <AminatedLayout>
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Create Employee</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Human resource</li>
                  <li className="breadcrumb-item active">Onboarding</li>
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
                <h3 className="card-title">Add new employee record</h3>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="card-body">
                  <div className="row ">
                    <div className="form-group col-md-4  d-flex flex-column ">
                      <label htmlFor="first_name">
                        First name <span className="text-danger">*</span>{' '}
                      </label>
                      <Input
                        type="text"
                        name="first_name"
                        id="first_name"
                        allowClear
                        className="w-75"
                        value={values.first_name}
                        onChange={handleChange}
                        placeholder="first name"
                        status={errors.first_name ? 'error' : ''}
                      />

                      <div
                        className={classnames(
                          'invalid-feedback',
                          'custom-feedback',
                          {
                            'custom-visibible': errors.first_name,
                          },
                        )}
                      >
                        {errors.first_name}
                      </div>
                    </div>
                    <div className="form-group col-md-4  d-flex flex-column ">
                      <label htmlFor="middle_name">
                        Middle name <span className="text-danger">*</span>{' '}
                      </label>
                      <Input
                        type="text"
                        name="middle_name"
                        id="middle_name"
                        allowClear
                        className="w-75"
                        placeholder="Middle name"
                        value={values.middle_name}
                        onChange={handleChange}
                        status={errors.middle_name ? 'error' : ''}
                      />

                      <div
                        className={classnames(
                          'invalid-feedback',
                          'custom-feedback',
                          {
                            'custom-visibible': errors.middle_name,
                          },
                        )}
                      >
                        {errors.middle_name}
                      </div>
                    </div>

                    <div className="form-group col-md-4  d-flex flex-column ">
                      <label htmlFor="last_name">
                        Last name <span className="text-danger">*</span>{' '}
                      </label>
                      <Input
                        type="text"
                        name="last_name"
                        id="last_name"
                        allowClear
                        className="w-75"
                        value={values.last_name}
                        placeholder="Last name"
                        onChange={handleChange}
                        status={errors.last_name ? 'error' : ''}
                      />

                      <div
                        className={classnames(
                          'invalid-feedback',
                          'custom-feedback',
                          {
                            'custom-visibible': errors.last_name,
                          },
                        )}
                      >
                        {errors.last_name}
                      </div>
                    </div>
                    <div className="form-group col-md-4  d-flex flex-column ">
                      <label htmlFor="gender_id">
                        Gender <span className="text-danger">*</span>{' '}
                      </label>
                      <Select
                        showSearch
                        allowClear
                        id="gender_id"
                        className="w-75"
                        placeholder="Employee's gender"
                        value={values.gender_id}
                        onChange={(value) =>
                          handleChange({ name: 'gender_id', value })
                        }
                        status={errors.gender_id ? 'error' : ''}
                        filterOption={(input, option) => {
                          // Ensure option.label is a string before calling toLowerCase
                          const label = option?.label ?? '';
                          return (
                            typeof label === 'string' &&
                            label.toLowerCase().includes(input.toLowerCase())
                          );
                        }}
                        loading={gender_loading}
                      >
                        {gender_data?.payload?.genders &&
                          gender_data?.payload?.genders.map(
                            (gender: Gender) => (
                              <Option
                                key={gender.id}
                                value={gender.id}
                                label={gender.name}
                              >
                                {' '}
                                {gender.name}
                              </Option>
                            ),
                          )}
                      </Select>

                      <div
                        className={classnames(
                          'invalid-feedback',
                          'custom-feedback',
                          {
                            'custom-visibible': errors.gender_id,
                          },
                        )}
                      >
                        {errors.gender_id}
                      </div>
                    </div>
                    <div className="form-group col-md-4  d-flex flex-column ">
                      <label htmlFor="email">
                        Work email <span className="text-danger">*</span>{' '}
                      </label>
                      <Input
                        type="text"
                        name="email"
                        id="email"
                        allowClear
                        className="w-75"
                        placeholder="Work email"
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
                    <div className="form-group col-md-4  d-flex flex-column ">
                      <label htmlFor="employment_date">
                        Employment Date <span className="text-danger">*</span>{' '}
                      </label>
                      <DatePicker
                        type="text"
                        name="employment_date"
                        id="employment_date"
                        allowClear
                        className="w-75"
                        placeholder="Employment date"
                        value={
                          values.employment_date
                            ? dayjs(values.employment_date)
                            : null
                        }
                        onChange={(_, value) =>
                          handleChange({ name: 'employment_date', value })
                        }
                        status={errors.employment_date ? 'error' : ''}
                      />

                      <div
                        className={classnames(
                          'invalid-feedback',
                          'custom-feedback',
                          {
                            'custom-visibible': errors.employment_date,
                          },
                        )}
                      >
                        {errors.employment_date}
                      </div>
                    </div>
                    <div className="form-group col-md-4  d-flex flex-column ">
                      <label htmlFor="employee_number">
                        Employee Number <span className="text-danger">*</span>{' '}
                      </label>
                      <Input
                        type="text"
                        name="employee_number"
                        id="employee_number"
                        allowClear
                        className="w-75"
                        value={values.employee_number}
                        readOnly
                        placeholder="Employee Number"
                        status={errors.employee_number ? 'error' : ''}
                      />

                      <div
                        className={classnames(
                          'invalid-feedback',
                          'custom-feedback',
                          {
                            'custom-visibible': errors.employee_number,
                          },
                        )}
                      >
                        {errors.employee_number}
                      </div>
                    </div>

                    <div className="form-group col-md-4  d-flex flex-column ">
                      <label htmlFor="department_id">
                        Department <span className="text-danger">*</span>{' '}
                      </label>

                      <Select
                        showSearch
                        allowClear
                        id="department_id"
                        className="w-75"
                        placeholder="Employee department"
                        value={values.department_id}
                        onChange={(value) =>
                          handleChange({ name: 'department_id', value })
                        }
                        prefix={
                          <IoIosAddCircleOutline
                            onClick={toggleDrawerDept}
                            size={17}
                            className="drawer_btn"
                          />
                        }
                        status={errors.department_id ? 'error' : ''}
                        filterOption={(input, option) => {
                          // Ensure option.label is a string before calling toLowerCase
                          const label = option?.label ?? '';
                          return (
                            typeof label === 'string' &&
                            label.toLowerCase().includes(input.toLowerCase())
                          );
                        }}
                        loading={dept_loading}
                      >
                        {emp_dept_data?.payload?.departments &&
                          emp_dept_data?.payload?.departments.map(
                            (department: Department) => (
                              <Option
                                key={department.id}
                                value={department.id}
                                label={department.name}
                              >
                                {' '}
                                {department.name}
                              </Option>
                            ),
                          )}
                      </Select>

                      <div
                        className={classnames(
                          'invalid-feedback',
                          'custom-feedback',
                          {
                            'custom-visibible': errors.department_id,
                          },
                        )}
                      >
                        {errors.department_id}
                      </div>
                    </div>
                    <div className="form-group col-md-4  d-flex flex-column ">
                      <label htmlFor="designation_id">
                        Designation <span className="text-danger">*</span>{' '}
                      </label>
                      <Select
                        showSearch
                        allowClear
                        id="designation_id"
                        className="w-75"
                        placeholder="Employee designation"
                        value={values.designation_id}
                        onChange={(value) =>
                          handleChange({ name: 'designation_id', value })
                        }
                        status={errors.designation_id ? 'error' : ''}
                        filterOption={(input, option) => {
                          // Ensure option.label is a string before calling toLowerCase
                          const label = option?.label ?? '';
                          return (
                            typeof label === 'string' &&
                            label.toLowerCase().includes(input.toLowerCase())
                          );
                        }}
                        loading={deg_loading}
                        prefix={
                          <IoIosAddCircleOutline
                            onClick={toggleDrawerDesg}
                            size={17}
                            className="drawer_btn"
                          />
                        }
                      >
                        {emp_des_data?.payload?.designations &&
                          emp_des_data?.payload?.designations.map(
                            (designation: Designation) => (
                              <Option
                                key={designation.id}
                                value={designation.id}
                                label={designation.name}
                              >
                                {' '}
                                {designation.name}
                              </Option>
                            ),
                          )}
                      </Select>

                      <div
                        className={classnames(
                          'invalid-feedback',
                          'custom-feedback',
                          {
                            'custom-visibible': errors.designation_id,
                          },
                        )}
                      >
                        {errors.designation_id}
                      </div>
                    </div>
                    <div className="form-group col-md-4  d-flex flex-column ">
                      <label htmlFor="primary_supervisor">
                        Primary supervisor{' '}
                      </label>
                      <Select
                        showSearch
                        allowClear
                        id="primary_supervisor"
                        className="w-75"
                        placeholder="Primary supervisor"
                        value={values.primary_supervisor}
                        onChange={(value) =>
                          handleChange({ name: 'primary_supervisor', value })
                        }
                        status={errors.primary_supervisor ? 'error' : ''}
                        filterOption={(input, option) => {
                          // Ensure option.label is a string before calling toLowerCase
                          const label = option?.label ?? '';
                          return (
                            typeof label === 'string' &&
                            label.toLowerCase().includes(input.toLowerCase())
                          );
                        }}
                        loading={user_loading}
                      >
                        {user_data?.payload?.system_users &&
                          user_data?.payload?.system_users.map((user: User) => (
                            <Option
                              key={user.id}
                              value={user.id}
                              label={user.fullname}
                            >
                              {' '}
                              {user.fullname}
                            </Option>
                          ))}
                      </Select>

                      <div
                        className={classnames(
                          'invalid-feedback',
                          'custom-feedback',
                          {
                            'custom-visibible': errors.primary_supervisor,
                          },
                        )}
                      >
                        {errors.primary_supervisor}
                      </div>
                    </div>

                    <div className="form-group col-md-4  d-flex flex-column ">
                      <label htmlFor="secondary_supervisor">
                        Secondary supervisor{' '}
                      </label>
                      <Select
                        showSearch
                        allowClear
                        id="secondary_supervisor"
                        className="w-75"
                        placeholder="Secondary supervisor"
                        value={values.secondary_supervisor}
                        onChange={(value) =>
                          handleChange({ name: 'secondary_supervisor', value })
                        }
                        status={errors.secondary_supervisor ? 'error' : ''}
                        filterOption={(input, option) => {
                          // Ensure option.label is a string before calling toLowerCase
                          const label = option?.label ?? '';
                          return (
                            typeof label === 'string' &&
                            label.toLowerCase().includes(input.toLowerCase())
                          );
                        }}
                        loading={user_loading}
                      >
                        {user_data?.payload?.system_users &&
                          user_data?.payload?.system_users.map((user: User) => (
                            <Option
                              key={user.id}
                              value={user.id}
                              label={user.fullname}
                            >
                              {' '}
                              {user.fullname}
                            </Option>
                          ))}
                      </Select>

                      <div
                        className={classnames(
                          'invalid-feedback',
                          'custom-feedback',
                          {
                            'custom-visibible': errors.secondary_supervisor,
                          },
                        )}
                      >
                        {errors.secondary_supervisor}
                      </div>
                    </div>
                    <div className="form-group col-md-4  d-flex flex-column ">
                      <label htmlFor="employeestatus_id">
                        Employment Status <span className="text-danger">*</span>{' '}
                      </label>
                      <Select
                        showSearch
                        allowClear
                        id="employeestatus_id"
                        className="w-75"
                        placeholder="Employee status"
                        value={values.employeestatus_id}
                        onChange={(value) =>
                          handleChange({ name: 'employeestatus_id', value })
                        }
                        status={errors.employeestatus_id ? 'error' : ''}
                        filterOption={(input, option) => {
                          // Ensure option.label is a string before calling toLowerCase
                          const label = option?.label ?? '';
                          return (
                            typeof label === 'string' &&
                            label.toLowerCase().includes(input.toLowerCase())
                          );
                        }}
                        loading={status_loading}
                        prefix={
                          <IoIosAddCircleOutline
                            onClick={toggleDrawerStatus}
                            size={17}
                            className="drawer_btn"
                          />
                        }
                      >
                        {emp_status_data?.payload?.employeeStatus &&
                          emp_status_data?.payload?.employeeStatus.map(
                            (employee_status: EmployeeStatus) => (
                              <Option
                                key={employee_status.id}
                                value={employee_status.id}
                                label={employee_status.name}
                              >
                                {' '}
                                {employee_status.name}
                              </Option>
                            ),
                          )}
                      </Select>

                      <div
                        className={classnames(
                          'invalid-feedback',
                          'custom-feedback',
                          {
                            'custom-visibible': errors.employeestatus_id,
                          },
                        )}
                      >
                        {errors.employeestatus_id}
                      </div>
                    </div>
                    <div className="form-group col-md-4  d-flex flex-column ">
                      <label htmlFor="employeecategory_id">
                        Employee category <span className="text-danger">*</span>{' '}
                      </label>
                      <Select
                        showSearch
                        allowClear
                        id="employeecategory_id"
                        className="w-75"
                        placeholder="Employee category"
                        value={values.employeecategory_id}
                        onChange={(value) =>
                          handleChange({ name: 'employeecategory_id', value })
                        }
                        status={errors.employeecategory_id ? 'error' : ''}
                        filterOption={(input, option) => {
                          // Ensure option.label is a string before calling toLowerCase
                          const label = option?.label ?? '';
                          return (
                            typeof label === 'string' &&
                            label.toLowerCase().includes(input.toLowerCase())
                          );
                        }}
                        loading={cat_loading}
                        prefix={
                          <IoIosAddCircleOutline
                            onClick={toggleDrawerCat}
                            size={17}
                            className="drawer_btn"
                          />
                        }
                      >
                        {emp_cat_data?.payload?.employeeCategory &&
                          emp_cat_data?.payload?.employeeCategory.map(
                            (employee_cat: EmployeeCategory) => (
                              <Option
                                key={employee_cat.id}
                                value={employee_cat.id}
                                label={employee_cat.name}
                              >
                                {' '}
                                {employee_cat.name}
                              </Option>
                            ),
                          )}
                      </Select>

                      <div
                        className={classnames(
                          'invalid-feedback',
                          'custom-feedback',
                          {
                            'custom-visibible': errors.employeecategory_id,
                          },
                        )}
                      >
                        {errors.employeecategory_id}
                      </div>
                    </div>
                    <div className="form-group col-md-4  d-flex flex-column ">
                      <label htmlFor="grade">
                        Grade <span className="text-danger">*</span>{' '}
                      </label>
                      <Select
                        showSearch
                        allowClear
                        id="grade_id"
                        className="w-75"
                        placeholder="Employee grade"
                        value={values.grade_id}
                        onChange={(value) =>
                          handleChange({ name: 'grade_id', value })
                        }
                        status={errors.grade_id ? 'error' : ''}
                        filterOption={(input, option) => {
                          // Ensure option.label is a string before calling toLowerCase
                          const label = option?.label ?? '';
                          return (
                            typeof label === 'string' &&
                            label.toLowerCase().includes(input.toLowerCase())
                          );
                        }}
                        loading={grade_loading}
                        prefix={
                          <IoIosAddCircleOutline
                            onClick={toggleDrawerGrade}
                            size={17}
                            className="drawer_btn"
                          />
                        }
                      >
                        {grade_data?.payload?.grades &&
                          grade_data?.payload?.grades.map((grade: Grade) => (
                            <Option
                              key={grade.id}
                              value={grade.id}
                              label={grade.name}
                            >
                              {' '}
                              {grade.name}
                            </Option>
                          ))}
                      </Select>

                      <div
                        className={classnames(
                          'invalid-feedback',
                          'custom-feedback',
                          {
                            'custom-visibible': errors.grade,
                          },
                        )}
                      >
                        {errors.grade}
                      </div>
                    </div>
                    <div className="form-group col-md-4  d-flex flex-column ">
                      <label htmlFor="step">
                        Step <span className="text-danger">*</span>{' '}
                      </label>
                      <Select
                        showSearch
                        allowClear
                        id="step_id"
                        className="w-75"
                        placeholder="Employee step"
                        value={values.step_id}
                        onChange={(value) =>
                          handleChange({ name: 'step_id', value })
                        }
                        status={errors.step_id ? 'error' : ''}
                        filterOption={(input, option) => {
                          // Ensure option.label is a string before calling toLowerCase
                          const label = option?.label ?? '';
                          return (
                            typeof label === 'string' &&
                            label.toLowerCase().includes(input.toLowerCase())
                          );
                        }}
                        loading={step_loading}
                        prefix={
                          <IoIosAddCircleOutline
                            onClick={toggleDrawerStep}
                            size={17}
                            className="drawer_btn"
                          />
                        }
                      >
                        {step_data?.payload?.steps &&
                          step_data?.payload?.steps.map((step: Step) => (
                            <Option
                              key={step.id}
                              value={step.id}
                              label={step.name}
                            >
                              {' '}
                              {step.name}
                            </Option>
                          ))}
                      </Select>

                      <div
                        className={classnames(
                          'invalid-feedback',
                          'custom-feedback',
                          {
                            'custom-visibible': errors.step,
                          },
                        )}
                      >
                        {errors.step}
                      </div>
                    </div>
                    <div className="form-group col-md-4  d-flex flex-column ">
                      <label htmlFor="company_id">
                        Company <span className="text-danger">*</span>{' '}
                      </label>
                      <Select
                        showSearch
                        allowClear
                        id="company_id"
                        className="w-75"
                        placeholder="Employee company"
                        value={values.company_id}
                        onChange={(value) =>
                          handleChange({ name: 'company_id', value })
                        }
                        status={errors.company_id ? 'error' : ''}
                        filterOption={(input, option) => {
                          // Ensure option.label is a string before calling toLowerCase
                          const label = option?.label ?? '';
                          return (
                            typeof label === 'string' &&
                            label.toLowerCase().includes(input.toLowerCase())
                          );
                        }}
                        loading={company_loading}
                        prefix={
                          <IoIosAddCircleOutline
                            onClick={toggleDrawerCompany}
                            size={17}
                            className="drawer_btn"
                          />
                        }
                      >
                        {company_data?.payload?.companys &&
                          company_data?.payload?.companys.map(
                            (company: Company) => (
                              <Option
                                key={company.id}
                                value={company.id}
                                label={company.name}
                              >
                                {' '}
                                {company.name}
                              </Option>
                            ),
                          )}
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
                    <div className="form-group col-md-4  d-flex flex-column ">
                      <label htmlFor="branch_id">
                        Branch <span className="text-danger">*</span>{' '}
                      </label>
                      <Select
                        showSearch
                        allowClear
                        id="branch_id"
                        className="w-75"
                        placeholder="Employee branch"
                        value={values.branch_id}
                        onChange={(value) =>
                          handleChange({ name: 'branch_id', value })
                        }
                        status={errors.branch_id ? 'error' : ''}
                        filterOption={(input, option) => {
                          // Ensure option.label is a string before calling toLowerCase
                          const label = option?.label ?? '';
                          return (
                            typeof label === 'string' &&
                            label.toLowerCase().includes(input.toLowerCase())
                          );
                        }}
                        loading={branch_loading}
                        prefix={
                          <IoIosAddCircleOutline
                            onClick={toggleDrawerBranch}
                            size={17}
                            className="drawer_btn"
                          />
                        }
                      >
                        {filtered_branch_data &&
                          filtered_branch_data?.map((branch: Branch) => (
                            <Option
                              key={branch.id}
                              value={branch.id}
                              label={branch.name}
                            >
                              {' '}
                              {branch.name}
                            </Option>
                          ))}
                      </Select>
                      <div
                        className={classnames(
                          'invalid-feedback',
                          'custom-feedback',
                          {
                            'custom-visibible': errors.branch_id,
                          },
                        )}
                      >
                        {errors.branch_id}
                      </div>
                    </div>
                    <div className="form-group col-md-4  d-flex flex-column ">
                      <label htmlFor="country_id">
                        Country <span className="text-danger">*</span>{' '}
                      </label>
                      <Select
                        showSearch
                        allowClear
                        id="country_id"
                        className="w-75"
                        placeholder="Employee country"
                        value={values.country_id}
                        onChange={(value) =>
                          handleChange({ name: 'country_id', value })
                        }
                        status={errors.country_id ? 'error' : ''}
                        filterOption={(input, option) => {
                          // Ensure option.label is a string before calling toLowerCase
                          const label = option?.label ?? '';
                          return (
                            typeof label === 'string' &&
                            label.toLowerCase().includes(input.toLowerCase())
                          );
                        }}
                        loading={country_loading}
                        prefix={
                          <IoIosAddCircleOutline
                            onClick={toggleDrawerCountry}
                            size={17}
                            className="drawer_btn"
                          />
                        }
                      >
                        {country_data?.payload?.countrys &&
                          country_data?.payload?.countrys.map(
                            (country: Country) => (
                              <Option
                                key={country.id}
                                value={country.id}
                                label={country.name}
                              >
                                {' '}
                                {country.name}
                              </Option>
                            ),
                          )}
                      </Select>

                      <div
                        className={classnames(
                          'invalid-feedback',
                          'custom-feedback',
                          {
                            'custom-visibible': errors.country_id,
                          },
                        )}
                      >
                        {errors.country_id}
                      </div>
                    </div>
                    <div className="form-group col-md-4  d-flex flex-column ">
                      <label htmlFor="state_id">
                        State <span className="text-danger">*</span>{' '}
                      </label>
                      <Select
                        showSearch
                        allowClear
                        id="state_id"
                        className="w-75"
                        placeholder="Employee state"
                        value={values.state_id}
                        onChange={(value) =>
                          handleChange({ name: 'state_id', value })
                        }
                        status={errors.state_id ? 'error' : ''}
                        filterOption={(input, option) => {
                          const label = option?.label ?? '';
                          return (
                            typeof label === 'string' &&
                            label.toLowerCase().includes(input.toLowerCase())
                          );
                        }}
                        loading={state_loading}
                        prefix={
                          <IoIosAddCircleOutline
                            onClick={toggleDrawerState}
                            size={17}
                            className="drawer_btn"
                          />
                        }
                      >
                        {state_data?.payload?.states &&
                          state_data?.payload?.states.map((state: State) => (
                            <Option
                              key={state.id}
                              value={state.id}
                              label={state.name}
                            >
                              {' '}
                              {state.name}
                            </Option>
                          ))}
                      </Select>

                      <div
                        className={classnames(
                          'invalid-feedback',
                          'custom-feedback',
                          {
                            'custom-visibible': errors.state_id,
                          },
                        )}
                      >
                        {errors.state_id}
                      </div>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="form-group col-md-12">
                      <Space>
                        <Popconfirm
                          title="Create Employee"
                          description="Are you sure you want to create this record?"
                          onConfirm={confirm}
                          onCancel={cancel}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button
                            type="primary"
                            icon={<PlusCircleOutlined />}
                            loading={loading}
                            className={styles.on_hover}
                            htmlType="button"
                          >
                            {' '}
                            Create
                          </Button>
                        </Popconfirm>
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
              {/* /.card-body */}
            </div>
            {/* /.card */}
          </div>

          {/* Drawer components */}
          {open_dept ? (
            <DepartmentDrawer
              open_dept={open_dept}
              setOpenDept={setOpenDept}
              refetchAll={refetchAll}
            />
          ) : null}

          {open_desg ? (
            <DesignationDrawer
              open_desg={open_desg}
              setOpenDesg={setOpenDesg}
              refetchAll={refetchAll}
            />
          ) : null}

          {open_cat ? (
            <EmpCategoryDrawer
              open_cat={open_cat}
              setOpenCat={setOpenCat}
              refetchAll={refetchAll}
            />
          ) : null}
          {open_status ? (
            <EmpStatusDrawer
              open_status={open_status}
              setOpenStatus={setOpenStatus}
              refetchAll={refetchAll}
            />
          ) : null}
          {open_grade ? (
            <GradeDrawer
              open_grade={open_grade}
              setOpenGrade={setOpenGrade}
              refetchAll={refetchAll}
            />
          ) : null}
          {open_step ? (
            <StepDrawer
              open_step={open_step}
              setOpenStep={setOpenStep}
              refetchAll={refetchAll}
            />
          ) : null}
          {open_company ? (
            <CompanyDrawer
              open_company={open_company}
              setOpenCompany={setOpenCompany}
              refetchAll={refetchAll}
            />
          ) : null}
          {open_state ? (
            <StateDrawer
              open_state={open_state}
              setOpenState={setOpenState}
              refetchAll={refetchAll}
            />
          ) : null}

          {open_country ? (
            <CountryDrawer
              open_country={open_country}
              setOpenCountry={setOpenCountry}
              refetchAll={refetchAll}
            />
          ) : null}
          {open_branch ? (
            <BranchDrawer
              open_branch={open_branch}
              setOpenBranch={setOpenBranch}
              refetchAll={refetchAll}
            />
          ) : null}
        </section>
        {/* /.content */}
      </AminatedLayout>
    </>
  );
}

export default CreateEmployee;
