import { Button, Image, Input, Space } from "antd";
import React, { useRef, useState } from "react";
import { BsPersonAdd } from "react-icons/bs";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { MdOutlineContactPhone } from "react-icons/md";
import uploadImage from "../../../../../../svg/upload.svg";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { LuFileEdit } from "react-icons/lu";
import { GoEye } from "react-icons/go";
import classnames from "classnames";

function ProfilePicture() {
  const [file, setFile] = useState(null);
  const [previewSrc, setPreviewSrc] = useState("");
  const file_input = useRef();
  function handleUpload(e) {
    file_input.current.click();
  }

  function handleFileChange(e) {
    e.preventDefault();
    const { files } = e.target;
    console.log({ files });

    const selectedFile = files[0];
    setFile(selectedFile);

    // Ensure the selected file is valid
    if (selectedFile instanceof Blob) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewSrc(objectUrl);

      // Clean up the object URL when the component unmounts
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      console.error("Selected file is not valid");
    }
    // setPreview(URL.createObjectURL(file));
  }

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
              className="on_hover"
              onClick={handleUpload}
              size="small"
              icon={<MdOutlineDriveFolderUpload />}
            >
              Upload
            </Button>
          </Space>
        </Space>
      </div>
    </div>
  );
}

function PersonalInfo() {
  const [edit_state, setEditSate] = useState(false);
  const input_sm = {
    height: "29px",
    fontSize: "12px",
    padding: "0 8px",
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
          <ProfilePicture />

          {edit_state ? (
            <div className="row">
              <div className="form-group col-md-4 d-flex flex-column ">
                <label htmlFor="first_name">
                  First Name <span className="text-danger">*</span>{" "}
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
                  Last Name <span className="text-danger">*</span>{" "}
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
                  Middle Name <span className="text-danger">*</span>{" "}
                </label>
                <Input
                  type="text"
                  name="first_name"
                  id="first_name"
                  allowClear
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
                  First Name <span className="text-danger">*</span>{" "}
                </label>
                <p> Seun</p>
              </div>
              <div className="form-group col-md-4 d-flex flex-column ">
                <label htmlFor="first_name">
                  Last Name <span className="text-danger">*</span>{" "}
                </label>
                <p> Ogunsanya Emmanuel</p>
              </div>
              <div className="form-group col-md-4 d-flex flex-column ">
                <label htmlFor="first_name" className="label__sm">
                  Middle Name <span className="text-danger">*</span>{" "}
                </label>
                <p> {"N/A"}</p>
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
  const [edit_state, setEditSate] = useState(false);
  const input_sm = {
    height: "29px",
    fontSize: "12px",
    padding: "0 8px",
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
                  First Name <span className="text-danger">*</span>{" "}
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
                  Last Name <span className="text-danger">*</span>{" "}
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
                  Middle Name <span className="text-danger">*</span>{" "}
                </label>
                <Input
                  type="text"
                  name="first_name"
                  id="first_name"
                  allowClear
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
                  First Name <span className="text-danger">*</span>{" "}
                </label>
                <p> Seun</p>
              </div>
              <div className="form-group col-md-4 d-flex flex-column ">
                <label htmlFor="first_name">
                  Last Name <span className="text-danger">*</span>{" "}
                </label>
                <p> Ogunsanya Emmanuel</p>
              </div>
              <div className="form-group col-md-4 d-flex flex-column ">
                <label htmlFor="first_name" className="label__sm">
                  Middle Name <span className="text-danger">*</span>{" "}
                </label>
                <p> {"N/A"}</p>
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
    height: "29px",
    fontSize: "12px",
    padding: "0 8px",
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
                  First Name <span className="text-danger">*</span>{" "}
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
                  Last Name <span className="text-danger">*</span>{" "}
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
                  Middle Name <span className="text-danger">*</span>{" "}
                </label>
                <Input
                  type="text"
                  name="first_name"
                  id="first_name"
                  allowClear
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
                  First Name <span className="text-danger">*</span>{" "}
                </label>
                <p> Seun</p>
              </div>
              <div className="form-group col-md-4 d-flex flex-column ">
                <label htmlFor="first_name">
                  Last Name <span className="text-danger">*</span>{" "}
                </label>
                <p> Ogunsanya Emmanuel</p>
              </div>
              <div className="form-group col-md-4 d-flex flex-column ">
                <label htmlFor="first_name" className="label__sm">
                  Middle Name <span className="text-danger">*</span>{" "}
                </label>
                <p> {"N/A"}</p>
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
