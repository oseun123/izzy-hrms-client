import React, { useState } from "react";
import { PiMoneyWavyLight } from "react-icons/pi";
import { LuFileEdit } from "react-icons/lu";
import { GoEye } from "react-icons/go";
import { Input } from "antd";

function Financial() {
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
    <div className="row">
      <div className="col-md-6">
        <div className="card ">
          <div className="card-header">
            <h3 className="card-title">
              <span className="space__align">
                <PiMoneyWavyLight />
                Financial Information
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
    </div>
  );
}

export default Financial;
