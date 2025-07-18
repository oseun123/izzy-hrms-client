import { Button, Image, Input, Popconfirm, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { BsPersonAdd } from 'react-icons/bs';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { MdOutlineContactPhone, MdDeleteOutline } from 'react-icons/md';

import { MdOutlineDriveFolderUpload } from 'react-icons/md';
import { LuFileEdit } from 'react-icons/lu';
import { GoEye } from 'react-icons/go';

import { useGetCurrentEmployeeProfilePic } from '../../../../../../store/actions/preferencesHooksActionsType';

import uploadImage from './../../../../../../svg/upload.svg';
import { useSelector } from 'react-redux';
import {
  clearUploadProfilePic,
  uploadProfilePic,
} from '../../../../../../store/actions/preferencesActions';
import { useDispatch } from 'react-redux';
import { useAxiosPrivate } from '../../../../../../hooks';

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

  // console.log({ file });

  return (
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
          <Space>
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
                  // loading={loading}
                >
                  Clear
                </Button>
              </Popconfirm>
            ) : null}
          </Space>
        </Space>
      </div>
    </div>
  );
}

function PersonalInfo() {
  const [edit_state, setEditSate] = useState(false);
  const input_sm = {
    height: '29px',
    fontSize: '12px',
    padding: '0 8px',
  };

  function handleToggle() {
    setEditSate((prev) => !prev);
  }

  return (
    <div className="col-md-6">
      <div className="card ">
        <div className="card-header">
          <h3 className="card-title">
            <span className="space__align">
              <BsPersonAdd />
              Personal Information
            </span>
          </h3>
          <div className="card-tools"></div>
        </div>
        <div className="card-body">
          <ProfilePicture />
        </div>
        {/* /.card-body */}
      </div>
    </div>
  );
}

function EmployementInfo() {
  const [edit_state, setEditSate] = useState(false);
  const input_sm = {
    height: '29px',
    fontSize: '12px',
    padding: '0 8px',
  };

  function handleToggle() {
    setEditSate((prev) => !prev);
  }
  return (
    <div className="col-md-6">
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
          {edit_state ? (
            <div className="row">
              <div className="form-group col-md-4 d-flex flex-column ">
                <label htmlFor="first_name">
                  First Name <span className="text-danger">*</span>{' '}
                </label>
                <Input
                  type="text"
                  name="first_name"
                  id="first_name"
                  allowClear
                  // className="w-75"
                  placeholder="First name"
                  // value={values.first_name}
                  // onChange={handleChange}
                  // status={errors.first_name ? "error" : ""}
                  style={input_sm}
                />

                {/* <div
                    className={classnames(
                      "invalid-feedback",
                      "custom-feedback",
                      {
                        "custom-visibible": errors.first_name,
                      }
                    )}
                  >
                    {errors.first_name}
                  </div> */}
              </div>
              <div className="form-group col-md-4 d-flex flex-column ">
                <label htmlFor="first_name">
                  Last Name <span className="text-danger">*</span>{' '}
                </label>
                <Input
                  type="text"
                  name="first_name"
                  id="first_name"
                  allowClear
                  // className="w-75"
                  placeholder="First name"
                  // value={values.first_name}
                  // onChange={handleChange}
                  // status={errors.first_name ? "error" : ""}
                  style={input_sm}
                />

                {/* <div
                    className={classnames(
                      "invalid-feedback",
                      "custom-feedback",
                      {
                        "custom-visibible": errors.first_name,
                      }
                    )}
                  >
                    {errors.first_name}
                  </div> */}
              </div>
              <div className="form-group col-md-4 d-flex flex-column ">
                <label htmlFor="first_name" className="label__sm">
                  Middle Name <span className="text-danger">*</span>{' '}
                </label>
                <Input
                  type="text"
                  name="first_name"
                  id="first_name"
                  allowClear
                  // @ts-ignore
                  size={15}
                  className="input_sm"
                  placeholder="First name"
                  // value={values.first_name}
                  // onChange={handleChange}
                  // status={errors.first_name ? "error" : ""}
                  style={input_sm}
                />

                {/* <div
                    className={classnames(
                      "invalid-feedback",
                      "custom-feedback",
                      {
                        "custom-visibible": errors.first_name,
                      }
                    )}
                  >
                    {errors.first_name}
                  </div> */}
              </div>
            </div>
          ) : (
            <div className="row">
              <div className="form-group col-md-4 d-flex flex-column ">
                <label htmlFor="first_name">
                  First Name <span className="text-danger">*</span>{' '}
                </label>
                <p> Seun</p>
              </div>
              <div className="form-group col-md-4 d-flex flex-column ">
                <label htmlFor="first_name">
                  Last Name <span className="text-danger">*</span>{' '}
                </label>
                <p> Ogunsanya Emmanuel</p>
              </div>
              <div className="form-group col-md-4 d-flex flex-column ">
                <label htmlFor="first_name" className="label__sm">
                  Middle Name <span className="text-danger">*</span>{' '}
                </label>
                <p> {'N/A'}</p>
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
  const [edit_state, setEditSate] = useState(false);
  const input_sm = {
    height: '29px',
    fontSize: '12px',
    padding: '0 8px',
  };

  function handleToggle() {
    setEditSate((prev) => !prev);
  }
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
          {edit_state ? (
            <div className="row">
              <div className="form-group col-md-4 d-flex flex-column ">
                <label htmlFor="first_name">
                  First Name <span className="text-danger">*</span>{' '}
                </label>
                <Input
                  type="text"
                  name="first_name"
                  id="first_name"
                  allowClear
                  // className="w-75"
                  placeholder="First name"
                  // value={values.first_name}
                  // onChange={handleChange}
                  // status={errors.first_name ? "error" : ""}
                  style={input_sm}
                />

                {/* <div
                    className={classnames(
                      "invalid-feedback",
                      "custom-feedback",
                      {
                        "custom-visibible": errors.first_name,
                      }
                    )}
                  >
                    {errors.first_name}
                  </div> */}
              </div>
              <div className="form-group col-md-4 d-flex flex-column ">
                <label htmlFor="first_name">
                  Last Name <span className="text-danger">*</span>{' '}
                </label>
                <Input
                  type="text"
                  name="first_name"
                  id="first_name"
                  allowClear
                  // className="w-75"
                  placeholder="First name"
                  // value={values.first_name}
                  // onChange={handleChange}
                  // status={errors.first_name ? "error" : ""}
                  style={input_sm}
                />

                {/* <div
                    className={classnames(
                      "invalid-feedback",
                      "custom-feedback",
                      {
                        "custom-visibible": errors.first_name,
                      }
                    )}
                  >
                    {errors.first_name}
                  </div> */}
              </div>
              <div className="form-group col-md-4 d-flex flex-column ">
                <label htmlFor="first_name" className="label__sm">
                  Middle Name <span className="text-danger">*</span>{' '}
                </label>
                <Input
                  type="text"
                  name="first_name"
                  id="first_name"
                  allowClear
                  // @ts-ignore
                  size={15}
                  className="input_sm"
                  placeholder="First name"
                  // value={values.first_name}
                  // onChange={handleChange}
                  // status={errors.first_name ? "error" : ""}
                  style={input_sm}
                />

                {/* <div
                    className={classnames(
                      "invalid-feedback",
                      "custom-feedback",
                      {
                        "custom-visibible": errors.first_name,
                      }
                    )}
                  >
                    {errors.first_name}
                  </div> */}
              </div>
            </div>
          ) : (
            <div className="row">
              <div className="form-group col-md-4 d-flex flex-column ">
                <label htmlFor="first_name">
                  First Name <span className="text-danger">*</span>{' '}
                </label>
                <p> Seun</p>
              </div>
              <div className="form-group col-md-4 d-flex flex-column ">
                <label htmlFor="first_name">
                  Last Name <span className="text-danger">*</span>{' '}
                </label>
                <p> Ogunsanya Emmanuel</p>
              </div>
              <div className="form-group col-md-4 d-flex flex-column ">
                <label htmlFor="first_name" className="label__sm">
                  Middle Name <span className="text-danger">*</span>{' '}
                </label>
                <p> {'N/A'}</p>
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
        <PersonalInfo />
        <EmployementInfo />

        <ContactInfo />
      </div>
    </>
  );
}

export default BioData;
