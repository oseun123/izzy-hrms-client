import { Button, Empty, Modal, Space, Input } from "antd";
import React, { useState } from "react";
import { GiPlayerNext } from "react-icons/gi";
import Kinsvg from "../../../../../../svg/kin.svg";
import { LuFileEdit } from "react-icons/lu";
import { GoEye } from "react-icons/go";
import Avatar from "react-avatar";
import { IoIosAddCircleOutline } from "react-icons/io";
function NextOfKin() {
  const [open, setOpen] = useState(false);
  const [show_empty, setShowEmpty] = useState(false);
  const [edit_state, setEditSate] = useState(false);
  const input_sm = {
    height: "29px",
    fontSize: "12px",
    padding: "0 8px",
  };

  function handleToggle() {
    setEditSate((prev) => !prev);
  }

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  function handleModalShow() {
    setEditSate(false);
    setOpen(true);
  }
  function handleModalAdd() {
    setEditSate(true);
    setOpen(true);
  }

  return (
    <div className="row">
      {" "}
      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <span className="space__align">
                <GiPlayerNext />
                Next of kin
              </span>
            </h3>
          </div>
          <div className="card-body">
            {show_empty ? (
              <div className="p-3">
                <Empty
                  image={Kinsvg}
                  description={"Next of Kin details have not been added yet"}
                  imageStyle={{
                    height: 200,
                  }}
                >
                  <Button className="on_hover_secondary" onClick={showModal}>
                    {" "}
                    Add
                  </Button>
                </Empty>
              </div>
            ) : (
              <>
                <div className="row  row__list">
                  <div
                    className="card elevation-1 card__list "
                    onClick={handleModalShow}
                  >
                    <div className="card__top">
                      <p>Brother</p>
                    </div>
                    <div className="card__mid">
                      <Avatar
                        name={`Ogunsanya Seun`}
                        round={true}
                        textSizeRatio={5}
                      />
                    </div>
                    <div className="card__bottom">
                      <p>Ogunsanya Seun</p>
                    </div>
                  </div>
                  <div
                    className="card elevation-1 card__list "
                    onClick={handleModalAdd}
                  >
                    <Space direction="vertical" align="center">
                      <IoIosAddCircleOutline className="i__con" />
                      <p>Add New</p>
                    </Space>
                  </div>
                </div>
              </>
            )}

            <Modal
              title={
                <div className="  d-flex justify-content-between align-items-center">
                  <Space>
                    <GiPlayerNext />
                    Next of Kin
                  </Space>

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
              }
              open={open}
              onOk={handleOk}
              onCancel={handleCancel}
              closable={false}
              footer={null}
            >
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
            </Modal>
          </div>
          {/* /.card-body */}
        </div>
      </div>
    </div>
  );
}

export default NextOfKin;
