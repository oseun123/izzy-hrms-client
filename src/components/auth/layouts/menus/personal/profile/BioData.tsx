import {
  Button,
  DatePicker,
  Image,
  Input,
  Popconfirm,
  Select,
  Skeleton,
  Space,
} from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { BsPersonAdd } from 'react-icons/bs';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { MdOutlineContactPhone, MdDeleteOutline } from 'react-icons/md';

import { MdOutlineDriveFolderUpload } from 'react-icons/md';
import { LuFileEdit } from 'react-icons/lu';
import { GoEye } from 'react-icons/go';

import {
  useGetCurrentEmployeeProfilePic,
  useGetSystemBranch,
  useGetSystemCompany,
  useGetSystemCountry,
  useGetSystemDepartment,
  useGetSystemDesignation,
  useGetSystemEmpCategory,
  useGetSystemEmpStatus,
  useGetSystemGender,
  useGetSystemGrade,
  useGetSystemSingleUser,
  useGetSystemState,
  useGetSystemStep,
  useGetSystemUsers,
  useGetEmpContact,
} from '../../../../../../store/actions/preferencesHooksActionsType';

import uploadImage from './../../../../../../svg/upload.svg';
import { useSelector } from 'react-redux';
import {
  clearUploadProfilePic,
  uploadProfilePic,
} from '../../../../../../store/actions/preferencesActions';
import { useDispatch } from 'react-redux';
import { useAxiosPrivate } from '../../../../../../hooks';

import classnames from 'classnames';
import { useCustomForm } from '../../../../../../util/hookstype';
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
  Contact,
} from '../../../../../../@types/api.types';
import dayjs from 'dayjs';
import { DateFormats } from '../../../../../../config';
import {
  createContact,
  updateEmployee,
} from '../../../../../../store/actions/hrActions';
const { Option } = Select;

interface FormValuesEmp {
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
  user_id: number | null;
}

interface ContactEmp {
  user_id: number | undefined;
  house_number: string;
  street_name: string;
  land_mark: string;
  lga: string;
  postal_code: string;
  state_id: number | null;
  country_id: number | null;
  state: State | null;
  country: Country | null;
}

function ProfilePicture() {
  const dispatch = useDispatch();
  const request = useAxiosPrivate();
  const currentuser = useSelector((state: any) => state.user.currentUser);

  const [enabled_pic, setEnablePic] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading_clear, setLoadingClear] = useState(false);
  const [user_id, setUserId] = useState<number | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [previewSrc, setPreviewSrc] = useState<undefined | string>('');
  const file_input = useRef<HTMLInputElement | null>(null);

  const { data: pic_data, isLoading: pic_loading } =
    useGetCurrentEmployeeProfilePic(enabled_pic, setEnablePic, user_id);

  // console.log({ pic_data });

  function handleUpload() {
    if (file_input.current) {
      file_input.current.click();
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const { files } = e.target;

    if (files && files.length > 0) {
      const selectedFile = files[0];
      setFile(selectedFile);

      setLoading(true);
      uploadProfilePic(dispatch, request, {
        image: selectedFile,
        user_id,
      }).then((res) => {
        if (res.status === 'success') {
          setEnablePic(true);
          setLoading(false);
        } else {
          setLoading(false);
          setPreviewSrc(undefined);
          setFile(null);
          file_input.current = null;
        }
      });

      // Ensure the selected file is valid
      if (selectedFile instanceof Blob) {
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreviewSrc(objectUrl);

        // Clean up the object URL when the component unmounts
        return () => URL.revokeObjectURL(objectUrl);
      } else {
        console.error('Selected file is not valid');
      }
    }
  }

  function DeleteUpload() {
    // alert('here');
    setLoadingClear(true);
    clearUploadProfilePic(dispatch, request, { user_id }).then((res) => {
      if (res.status === 'success') {
        setEnablePic(true);
        setLoadingClear(false);
        setPreviewSrc(undefined);
      }
    });
  }

  useEffect(() => {
    if (currentuser) {
      setUserId(parseInt(currentuser.id));

      setEnablePic(true);
    }
  }, [currentuser]);

  useEffect(() => {
    if (pic_data && pic_data?.payload?.profile_pic?.image_url) {
      setPreviewSrc(pic_data.payload.profile_pic.image_url);
    }
  }, [pic_data]);

  return (
    <div className="col-md-6">
      <div className="card ">
        <div className="card-header">
          <h3 className="card-title">
            <span className="space__align">
              <BsPersonAdd />
              Profile Picture
            </span>
          </h3>
          <div className="card-tools"></div>
        </div>
        <div className="card-body">
          {pic_loading ? (
            <Skeleton active />
          ) : (
            <div className="row">
              <div className="form-group">
                <Space size="large">
                  <div>
                    <input
                      type="file"
                      name="profile-picture"
                      accept="image/png, image/jpeg, image/jpg"
                      hidden
                      ref={file_input}
                      onChange={handleFileChange}
                    />
                    <Image
                      width={150}
                      height={180}
                      className="rounded color__border"
                      src={previewSrc}
                      fallback={uploadImage}
                    />
                  </div>
                  <Space wrap>
                    <Button
                      className="on_hover p-3"
                      onClick={handleUpload}
                      size="small"
                      icon={<MdOutlineDriveFolderUpload />}
                      loading={loading}
                    >
                      Upload
                    </Button>

                    {pic_data && pic_data?.payload?.profile_pic?.image_url ? (
                      <Popconfirm
                        title="Delete Profile Picture"
                        description="Are you sure to delete this profile picture?"
                        onConfirm={DeleteUpload}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button
                          className="on_hover_secondary p-3"
                          size="small"
                          icon={<MdDeleteOutline />}
                          loading={loading_clear}
                        >
                          Clear
                        </Button>
                      </Popconfirm>
                    ) : null}
                  </Space>
                </Space>
              </div>
            </div>
          )}
        </div>
        {/* /.card-body */}
      </div>
    </div>
  );
}

function EmployementInfo() {
  const request = useAxiosPrivate();
  const dispatch = useDispatch();
  const currentuser = useSelector((state: any) => state.user.currentUser);

  const [enabled_user, setEnabledUser] = useState(true);
  const [enabled_gender, setEnabledGender] = useState(true);
  const [enabled_emp_dept, setEnabledEmpDept] = useState(true);
  const [enabled_emp_des, setEnabledEmpDeS] = useState(true);
  const [enabled_empStatus, setEnabledEmpStatus] = useState(true);
  const [enabled_empCat, setEnabledEmpCat] = useState(true);
  const [enabled_grade, setEnabledGrade] = useState(true);
  const [enabled_step, setEnabledStep] = useState(true);
  const [enabled_country, setEnabledCountry] = useState(true);
  const [enabled_state, setEnabledState] = useState(true);
  const [enabled_branch, setEnabledBranch] = useState(true);
  const [enabled_com, setEnabledCom] = useState(true);
  const [enabled_single_user, setEnabledSingleUser] = useState(false);
  const [edit_state, setEditSate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user_id, setUserId] = useState<number | null>(null);
  const [selected, setSelected] = useState<User | null>(null);
  const [filtered_branch_data, setFilteredBranch] = useState<Branch[]>();

  const { data: gender_data, isLoading: gender_loading } = useGetSystemGender(
    enabled_gender,
    setEnabledGender,
    'all',
  );
  const { data: emp_dept_data, isLoading: dept_loading } =
    useGetSystemDepartment(enabled_emp_dept, setEnabledEmpDept, 'all');

  const { data: emp_des_data, isLoading: deg_loading } =
    useGetSystemDesignation(enabled_emp_des, setEnabledEmpDeS, 'all');

  const { data: user_data, isLoading: user_loading } = useGetSystemUsers(
    enabled_user,
    setEnabledUser,
  );

  const { data: emp_status_data, isLoading: status_loading } =
    useGetSystemEmpStatus(enabled_empStatus, setEnabledEmpStatus, 'all');

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

  const {
    data: user_single_data,
    isLoading: user_single_loading,
    refetch,
  } = useGetSystemSingleUser(
    enabled_single_user,
    setEnabledSingleUser,
    user_id,
  );

  const initValues: FormValuesEmp = {
    user_id: selected?.id || null,
    first_name: selected?.first_name || '',
    middle_name: selected?.middle_name || '',
    last_name: selected?.last_name || '',
    employee_number: selected?.employee_number || '',
    employment_date: selected?.employment_date || '',
    department_id: selected?.department_id || null,
    grade_id: selected?.grade_id || null,
    step_id: selected?.step_id || null,
    branch_id: selected?.branch_id || null,
    company_id: selected?.company_id || null,
    designation_id: selected?.designation_id || null,
    primary_supervisor: selected?.primary_supervisor || null,
    secondary_supervisor: selected?.secondary_supervisor || null,
    employeestatus_id: selected?.employeestatus_id || null,
    employeecategory_id: selected?.employeecategory_id || null,
    email: selected?.email || '',
    country_id: selected?.country_id || null,
    state_id: selected?.state_id || null,
    gender_id: selected?.gender_id || null,
  };

  function handleToggle() {
    setEditSate((prev) => !prev);
  }

  function validateUpdateEmployee(
    values: FormValuesEmp,
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

  function updateEmployeeCallback() {
    setLoading(true);
    // console.log({ values });
    updateEmployee(dispatch, request, values).then((res) => {
      if (res?.status === 'success') {
        clearForm();
        refetch();
      }
      setLoading(false);
    });
  }

  function confirm() {
    const fakeEvent = {
      preventDefault: () => {},
    } as React.FormEvent<HTMLFormElement>;
    handleSubmit(fakeEvent);
  }

  const { values, errors, handleChange, handleSubmit, clearForm } =
    useCustomForm(updateEmployeeCallback, initValues, validateUpdateEmployee);
  // set user_id
  useEffect(() => {
    if (currentuser) {
      setUserId(parseInt(currentuser.id));

      setEnabledSingleUser(true);
    }
  }, [currentuser]);

  // set selected user data
  useEffect(() => {
    if (user_single_data && Object.keys(user_single_data).length) {
      const single = user_single_data?.payload?.system_user;

      setSelected(single || null);
    }
  }, [user_single_data]);

  // set clear init data and set with the right data

  useEffect(() => {
    if (selected) {
      clearForm();
      values.user_id = selected?.id;
      values.first_name = selected?.first_name;
      values.last_name = selected?.last_name;
      values.middle_name = selected?.middle_name;
      values.gender_id = selected?.gender_id;
      values.email = selected?.email;
      values.employment_date = selected?.employment_date;
      values.employee_number = selected?.employee_number;
      values.department_id = selected?.department_id;
      values.designation_id = selected?.designation_id;
      values.primary_supervisor = selected?.primary_supervisor;
      values.secondary_supervisor = selected?.secondary_supervisor;
      values.employeestatus_id = selected?.employeestatus_id;
      values.step_id = selected?.step_id;
      values.grade_id = selected?.grade_id;
      values.employeecategory_id = selected?.employeecategory_id;
      values.company_id = selected?.company_id;
      values.country_id = selected?.country_id;
      values.state_id = selected?.state_id;
      values.branch_id = selected?.branch_id;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  useEffect(() => {
    if (values.company_id && branch_data && Object.keys(branch_data).length) {
      const filtered = branch_data.payload.branchs?.filter(
        (item) => item.company.id === values.company_id,
      );
      setFilteredBranch(filtered);
    }
  }, [values.company_id, branch_data]);

  return (
    <div className="col-md-12">
      <div className="card ">
        <div className="card-header">
          <h3 className="card-title">
            <span className="space__align">
              <HiOutlineOfficeBuilding />
              Employement Information
            </span>
          </h3>
          <div className="card-tools">
            {edit_state ? (
              <GoEye
                className="icon__title"
                onClick={handleToggle}
                title="View"
              />
            ) : (
              <LuFileEdit
                className="icon__title"
                onClick={handleToggle}
                title="Edit"
              />
            )}
          </div>
        </div>
        <div className="card-body">
          {user_single_loading ? (
            <Skeleton active />
          ) : edit_state ? (
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="form-group col-md-4 d-flex flex-column ">
                  <label htmlFor="first_name">
                    First name <span className="text-danger">*</span>{' '}
                  </label>
                  <Input
                    type="text"
                    name="first_name"
                    id="first_name"
                    allowClear
                    // className="w-75"
                    placeholder="First name"
                    value={values.first_name}
                    onChange={handleChange}
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

                <div className="form-group col-md-4 d-flex flex-column ">
                  <label htmlFor="middle_name" className="label__sm">
                    Middle name <span className="text-danger">*</span>{' '}
                  </label>
                  <Input
                    type="text"
                    name="middle_name"
                    id="middle_name"
                    allowClear
                    // @ts-ignore
                    size={15}
                    className="input_sm"
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
                <div className="form-group col-md-4 d-flex flex-column ">
                  <label htmlFor="last_name">
                    Last name <span className="text-danger">*</span>{' '}
                  </label>
                  <Input
                    type="text"
                    name="last_name"
                    id="last_name"
                    allowClear
                    // className="w-75"
                    placeholder="First name"
                    value={values.last_name}
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
                    // className="w-75"
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
                      gender_data?.payload?.genders.map((gender: Gender) => (
                        <Option
                          key={gender.id}
                          value={gender.id}
                          label={gender.name}
                        >
                          {' '}
                          {gender.name}
                        </Option>
                      ))}
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
                    // className="w-75"
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
                    // className="w-75"
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
                    // className="w-75"
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
                    // className="w-75"
                    placeholder="Employee department"
                    value={values.department_id}
                    onChange={(value) =>
                      handleChange({ name: 'department_id', value })
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
                    // className="w-75"
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
                    // className="w-75"
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
                    // className="w-75"
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
                    // className="w-75"
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
                    // className="w-75"
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
                    // className="w-75"
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
                    // className="w-75"
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
                  >
                    {step_data?.payload?.steps &&
                      step_data?.payload?.steps.map((step: Step) => (
                        <Option key={step.id} value={step.id} label={step.name}>
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
                    // className="w-75"
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
                    // className="w-75"
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
                    // className="w-75"
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
                      description="Are you sure you want to updatte this record?"
                      onConfirm={confirm}
                      // onCancel={cancel}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button
                        type="primary"
                        icon={<LuFileEdit />}
                        loading={loading}
                        className="on_hover"
                        htmlType="button"
                      >
                        {' '}
                        Save
                      </Button>
                    </Popconfirm>
                  </Space>
                </div>
              </div>
            </form>
          ) : (
            <div className="row">
              <div className="form-group col-md-4 d-flex flex-column ">
                <label htmlFor="first_name">First Name </label>
                <p> {selected?.first_name || 'N/A'}</p>
              </div>

              <div className="form-group col-md-4 d-flex flex-column ">
                <label htmlFor="middle_name" className="label__sm">
                  Middle Name{' '}
                </label>
                <p> {selected?.middle_name || 'N/A'}</p>
              </div>
              <div className="form-group col-md-4 d-flex flex-column ">
                <label htmlFor="last_name">Last Name </label>
                <p> {selected?.last_name || 'N/A'}</p>
              </div>
              <div className="form-group col-md-4  d-flex flex-column ">
                <label htmlFor="gender_id">Gender </label>
                <p>
                  {' '}
                  {selected?.gender_id && gender_data?.payload?.genders
                    ? gender_data.payload.genders.find(
                        (item) => item.id === selected.gender_id,
                      )?.name || 'N/A'
                    : 'N/A'}
                </p>
              </div>

              <div className="form-group col-md-4  d-flex flex-column ">
                <label htmlFor="email">Work email </label>

                <p> {selected?.email || 'N/A'}</p>
              </div>

              <div className="form-group col-md-4  d-flex flex-column ">
                <label htmlFor="employment_date">Employment Date </label>
                <p>
                  {' '}
                  {selected?.employment_date
                    ? dayjs(selected.employment_date).format(
                        DateFormats.DEFAULT,
                      )
                    : 'N/A'}
                </p>
              </div>

              <div className="form-group col-md-4  d-flex flex-column ">
                <label htmlFor="employee_number">Employee Number </label>
                <p> {selected?.employee_number || 'N/A'}</p>
              </div>

              <div className="form-group col-md-4  d-flex flex-column ">
                <label htmlFor="department_id">Department </label>
                <p>
                  {' '}
                  {selected?.department_id &&
                  emp_dept_data?.payload?.departments
                    ? emp_dept_data.payload.departments.find(
                        (item) => item.id === selected.department_id,
                      )?.name || 'N/A'
                    : 'N/A'}
                </p>
              </div>
              <div className="form-group col-md-4  d-flex flex-column ">
                <label htmlFor="designation_id">Designation </label>
                <p>
                  {' '}
                  {selected?.designation_id &&
                  emp_des_data?.payload?.designations
                    ? emp_des_data.payload.designations.find(
                        (item) => item.id === selected.designation_id,
                      )?.name || 'N/A'
                    : 'N/A'}
                </p>
              </div>

              <div className="form-group col-md-4  d-flex flex-column ">
                <label htmlFor="primary_supervisor">Primary supervisor </label>

                {selected?.primary_supervisor &&
                user_data?.payload?.system_users
                  ? user_data?.payload?.system_users.find(
                      (item) => item.id === selected.primary_supervisor,
                    )?.fullname || 'N/A'
                  : 'N/A'}
              </div>

              <div className="form-group col-md-4  d-flex flex-column ">
                <label htmlFor="secondary_supervisor">
                  Secondary supervisor{' '}
                </label>

                {selected?.secondary_supervisor &&
                user_data?.payload?.system_users
                  ? user_data?.payload?.system_users.find(
                      (item) => item.id === selected.secondary_supervisor,
                    )?.fullname || 'N/A'
                  : 'N/A'}
              </div>

              <div className="form-group col-md-4  d-flex flex-column ">
                <label htmlFor="employeestatus_id">Employment Status</label>
                <p>
                  {' '}
                  {selected?.employeestatus_id &&
                  emp_status_data?.payload?.employeeStatus
                    ? emp_status_data?.payload?.employeeStatus.find(
                        (item) => item.id === selected.employeestatus_id,
                      )?.name || 'N/A'
                    : 'N/A'}
                </p>
              </div>

              <div className="form-group col-md-4  d-flex flex-column ">
                <label htmlFor="employeecategory_id">Employee category</label>

                <p>
                  {' '}
                  {selected?.employeecategory_id &&
                  emp_cat_data?.payload?.employeeCategory
                    ? emp_cat_data?.payload?.employeeCategory.find(
                        (item) => item.id === selected.employeecategory_id,
                      )?.name || 'N/A'
                    : 'N/A'}
                </p>
              </div>
              <div className="form-group col-md-4  d-flex flex-column ">
                <label htmlFor="grade">Grade</label>

                <p>
                  {' '}
                  {selected?.grade_id && grade_data?.payload?.grades
                    ? grade_data?.payload?.grades.find(
                        (item) => item.id === selected.grade_id,
                      )?.name || 'N/A'
                    : 'N/A'}
                </p>
              </div>
              <div className="form-group col-md-4  d-flex flex-column ">
                <label htmlFor="step">Step</label>
                <p>
                  {' '}
                  {selected?.step_id && step_data?.payload?.steps
                    ? step_data?.payload?.steps.find(
                        (item) => item.id === selected.step_id,
                      )?.name || 'N/A'
                    : 'N/A'}
                </p>
              </div>

              <div className="form-group col-md-4  d-flex flex-column ">
                <label htmlFor="company_id">Company</label>

                <p>
                  {' '}
                  {selected?.company_id && company_data?.payload?.companys
                    ? company_data?.payload?.companys.find(
                        (item) => item.id === selected.company_id,
                      )?.name || 'N/A'
                    : 'N/A'}
                </p>
              </div>
              <div className="form-group col-md-4  d-flex flex-column ">
                <label htmlFor="branch_id">Branch</label>
                <p>
                  {' '}
                  {selected?.branch_id && filtered_branch_data
                    ? filtered_branch_data.find(
                        (item) => item.id === selected.branch_id,
                      )?.name || 'N/A'
                    : 'N/A'}
                </p>
              </div>
              <div className="form-group col-md-4  d-flex flex-column ">
                <label htmlFor="country_id">Country</label>
                <p>
                  {' '}
                  {selected?.country_id && country_data?.payload?.countrys
                    ? country_data?.payload?.countrys.find(
                        (item) => item.id === selected.country_id,
                      )?.name || 'N/A'
                    : 'N/A'}
                </p>
              </div>
              <div className="form-group col-md-4  d-flex flex-column ">
                <label htmlFor="state_id">State</label>
                <p>
                  {' '}
                  {selected?.state_id && state_data?.payload?.states
                    ? state_data?.payload?.states.find(
                        (item) => item.id === selected.state_id,
                      )?.name || 'N/A'
                    : 'N/A'}
                </p>
              </div>
            </div>
          )}
        </div>
        {/* /.card-body */}
      </div>
    </div>
  );
}

function ContactInfo() {
  const dispatch = useDispatch();
  const request = useAxiosPrivate();
  const [edit_state, setEditSate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [enabled_con, setEnableCon] = useState(false);
  const [user_id, setUserId] = useState<number | null>(null);
  const [selected, setSelected] = useState<Contact | null>(null);
  const [enabled_country, setEnabledCountry] = useState(true);
  const [enabled_state, setEnabledState] = useState(true);
  const currentuser = useSelector((state: any) => state.user.currentUser);

  const { data: country_data, isLoading: country_loading } =
    useGetSystemCountry(enabled_country, setEnabledCountry, 'all');

  const { data: state_data, isLoading: state_loading } = useGetSystemState(
    enabled_state,
    setEnabledState,
    'all',
  );

  const initValues: ContactEmp = {
    user_id: selected?.user_id || undefined,
    house_number: selected?.house_number || '',
    street_name: selected?.street_name || '',
    land_mark: selected?.land_mark || '',
    lga: selected?.lga || '',
    postal_code: selected?.postal_code || '',
    state_id: selected?.state_id || null,
    country_id: selected?.country_id || null,
    state: selected?.state || null,
    country: selected?.country || null,
  };

  const {
    data: contact_data,
    isLoading: contact_loading,
    refetch,
  } = useGetEmpContact(enabled_con, setEnableCon, user_id);

  function handleToggle() {
    setEditSate((prev) => !prev);
  }

  function validateUpdateContact(
    values: ContactEmp,
  ): Record<string, string | undefined> {
    let errors: Record<string, string | undefined> = {};

    if (values.hasOwnProperty('user_id') && values.user_id === null) {
      errors.user_id = 'Invalid user.';
    }
    if (
      values.hasOwnProperty('house_number') &&
      values.house_number.trim() === ''
    ) {
      errors.house_number = 'House number is required.';
    }
    if (
      values.hasOwnProperty('street_name') &&
      values.street_name.trim() === ''
    ) {
      errors.street_name = 'Street number is required.';
    }
    if (values.hasOwnProperty('land_mark') && values.land_mark.trim() === '') {
      errors.land_mark = 'Land mark is required.';
    }
    if (values.hasOwnProperty('lga') && values.lga.trim() === '') {
      errors.lga = 'Land mark is required.';
    }
    if (
      values.hasOwnProperty('postal_code') &&
      values.postal_code.trim() === ''
    ) {
      errors.postal_code = 'Postal code is required.';
    }
    if (values.hasOwnProperty('state_id') && values.state_id === null) {
      errors.state_id = 'State is required.';
    }
    if (values.hasOwnProperty('country_id') && values.country_id === null) {
      errors.country_id = 'Country is required.';
    }

    return errors;
  }

  //callback

  function updateContactCallback() {
    setLoading(true);
    // console.log({ values });
    createContact(dispatch, request, values).then((res) => {
      if (res?.status === 'success') {
        clearForm();
        refetch();
      }
      setLoading(false);
    });
  }

  function confirm() {
    const fakeEvent = {
      preventDefault: () => {},
    } as React.FormEvent<HTMLFormElement>;
    handleSubmit(fakeEvent);
  }

  const { values, errors, handleChange, handleSubmit, clearForm } =
    useCustomForm(updateContactCallback, initValues, validateUpdateContact);

  useEffect(() => {
    if (currentuser) {
      setUserId(parseInt(currentuser.id));

      setEnableCon(true);
    }
  }, [currentuser]);

  // set selected user data
  useEffect(() => {
    if (contact_data && Object.keys(contact_data).length) {
      const single = contact_data?.payload?.contact;

      setSelected(single || null);
    }
  }, [contact_data]);

  useEffect(() => {
    if (selected) {
      clearForm();
      values.user_id = selected?.id;
      values.house_number = selected?.house_number;
      values.street_name = selected?.street_name;
      values.land_mark = selected?.land_mark;
      values.lga = selected?.lga;
      values.postal_code = selected?.postal_code;
      values.state_id = selected?.state_id;
      values.country_id = selected?.country_id;
      values.country = selected?.country;
      values.state = selected?.state;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <div className="col-md-6">
      <div className="card ">
        <div className="card-header">
          <h3 className="card-title">
            <span className="space__align">
              <MdOutlineContactPhone />
              Contact Information
            </span>
          </h3>
          <div className="card-tools">
            {edit_state ? (
              <GoEye
                className="icon__title"
                onClick={handleToggle}
                title="View"
              />
            ) : (
              <LuFileEdit
                className="icon__title"
                onClick={handleToggle}
                title="Edit"
              />
            )}
          </div>
        </div>
        <div className="card-body">
          {contact_loading ? (
            <Skeleton active />
          ) : edit_state ? (
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="form-group col-md-4 d-flex flex-column ">
                  <label htmlFor="house_number">
                    House number <span className="text-danger">*</span>{' '}
                  </label>
                  <Input
                    type="text"
                    name="house_number"
                    id="house_number"
                    allowClear
                    // className="w-75"
                    placeholder="House number"
                    value={values.house_number}
                    onChange={handleChange}
                    status={errors.house_number ? 'error' : ''}
                  />

                  <div
                    className={classnames(
                      'invalid-feedback',
                      'custom-feedback',
                      {
                        'custom-visibible': errors.house_number,
                      },
                    )}
                  >
                    {errors.house_number}
                  </div>
                </div>
                <div className="form-group col-md-4 d-flex flex-column ">
                  <label htmlFor="street_name">
                    Street name <span className="text-danger">*</span>{' '}
                  </label>
                  <Input
                    type="text"
                    name="street_name"
                    id="street_name"
                    allowClear
                    // className="w-75"
                    placeholder=" Street name"
                    value={values.street_name}
                    onChange={handleChange}
                    status={errors.street_name ? 'error' : ''}
                  />

                  <div
                    className={classnames(
                      'invalid-feedback',
                      'custom-feedback',
                      {
                        'custom-visibible': errors.street_name,
                      },
                    )}
                  >
                    {errors.street_name}
                  </div>
                </div>
                <div className="form-group col-md-4 d-flex flex-column ">
                  <label htmlFor="land_mark">
                    Land mark <span className="text-danger">*</span>{' '}
                  </label>
                  <Input
                    type="text"
                    name="land_mark"
                    id="land_mark"
                    allowClear
                    // className="w-75"
                    placeholder=" Land mark"
                    value={values.land_mark}
                    onChange={handleChange}
                    status={errors.land_mark ? 'error' : ''}
                  />

                  <div
                    className={classnames(
                      'invalid-feedback',
                      'custom-feedback',
                      {
                        'custom-visibible': errors.land_mark,
                      },
                    )}
                  >
                    {errors.land_mark}
                  </div>
                </div>
                <div className="form-group col-md-4 d-flex flex-column ">
                  <label htmlFor="postal_code">
                    Postal code <span className="text-danger">*</span>{' '}
                  </label>
                  <Input
                    type="text"
                    name="postal_code"
                    id="postal_code"
                    allowClear
                    // className="w-75"
                    placeholder="Postal code"
                    value={values.postal_code}
                    onChange={handleChange}
                    status={errors.postal_code ? 'error' : ''}
                  />

                  <div
                    className={classnames(
                      'invalid-feedback',
                      'custom-feedback',
                      {
                        'custom-visibible': errors.postal_code,
                      },
                    )}
                  >
                    {errors.postal_code}
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
                    // className="w-75"
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
                    // className="w-75"
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
                <div className="form-group col-md-4 d-flex flex-column ">
                  <label htmlFor="lga">
                    Lga <span className="text-danger">*</span>{' '}
                  </label>
                  <Input
                    type="text"
                    name="lga"
                    id="lga"
                    allowClear
                    // className="w-75"
                    placeholder=" Lga"
                    value={values.lga}
                    onChange={handleChange}
                    status={errors.lga ? 'error' : ''}
                  />

                  <div
                    className={classnames(
                      'invalid-feedback',
                      'custom-feedback',
                      {
                        'custom-visibible': errors.lga,
                      },
                    )}
                  >
                    {errors.lga}
                  </div>
                </div>
              </div>

              <div className="row mt-4">
                <div className="form-group col-md-12">
                  <Space>
                    <Popconfirm
                      title="Create Contact"
                      description="Are you sure you want to update this record?"
                      onConfirm={confirm}
                      // onCancel={cancel}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button
                        type="primary"
                        icon={<LuFileEdit />}
                        loading={loading}
                        className="on_hover"
                        htmlType="button"
                      >
                        {' '}
                        Save
                      </Button>
                    </Popconfirm>
                  </Space>
                </div>
              </div>
            </form>
          ) : (
            <div className="row">
              <div className="form-group col-md-4 d-flex flex-column ">
                <label htmlFor="house_number">House number</label>
                <p>{selected?.house_number || 'N/A'} </p>
              </div>
              <div className="form-group col-md-4 d-flex flex-column ">
                <label htmlFor="street_name">Street name</label>
                <p>{selected?.street_name || 'N/A'} </p>
              </div>
              <div className="form-group col-md-4 d-flex flex-column ">
                <label htmlFor="land_mark">Land mark</label>
                <p>{selected?.land_mark || 'N/A'} </p>
              </div>
              <div className="form-group col-md-4 d-flex flex-column ">
                <label htmlFor="postal_code">Postal code</label>
                <p>{selected?.postal_code || 'N/A'} </p>
              </div>
              <div className="form-group col-md-4 d-flex flex-column ">
                <label htmlFor="country_id">Country</label>
                <p>{selected?.country?.name || 'N/A'} </p>
              </div>
              <div className="form-group col-md-4 d-flex flex-column ">
                <label htmlFor="state_id">State</label>
                <p>{selected?.state?.name || 'N/A'} </p>
              </div>
              <div className="form-group col-md-4 d-flex flex-column ">
                <label htmlFor="lga">Lga</label>
                <p>{selected?.lga || 'N/A'} </p>
              </div>
            </div>
          )}
        </div>
        {/* /.card-body */}
      </div>
    </div>
  );
}

function BioData() {
  return (
    <>
      <div className="row">
        <ProfilePicture />
        <ContactInfo />
        <EmployementInfo />
      </div>
    </>
  );
}

export default BioData;
