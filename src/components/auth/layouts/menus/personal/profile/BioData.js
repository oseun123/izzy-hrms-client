import { Button, Image, Space } from "antd";
import React from "react";
import { BsPersonAdd } from "react-icons/bs";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { MdOutlineContactPhone } from "react-icons/md";
import uploadImage from "../../../../../../svg/upload.svg";
function BioData() {
  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <div className="card ">
            <div className="card-header">
              <h3 className="card-title">
                <span className="space__align">
                  <BsPersonAdd />
                  Personal Information
                </span>
              </h3>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="form-group">
                  <Space size="large">
                    <div>
                      <Image
                        width={200}
                        className="rounded color__border"
                        src=""
                        fallback={uploadImage}
                      />
                    </div>
                    <Space>
                      <Button size="small">Upload</Button>
                      <Button size="small" className="">
                        Save
                      </Button>
                    </Space>
                  </Space>
                </div>
              </div>
              <div className="row">
                <div className="col-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder=".col-3"
                  />
                </div>
                <div className="col-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder=".col-4"
                  />
                </div>
                <div className="col-5">
                  <input
                    type="text"
                    className="form-control"
                    placeholder=".col-5"
                  />
                </div>
              </div>
            </div>
            {/* /.card-body */}
          </div>
        </div>
        <div className="col-md-6">
          <div className="card ">
            <div className="card-header">
              <h3 className="card-title">
                <span className="space__align">
                  <HiOutlineOfficeBuilding />
                  Employement Information
                </span>
              </h3>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder=".col-3"
                  />
                </div>
                <div className="col-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder=".col-4"
                  />
                </div>
                <div className="col-5">
                  <input
                    type="text"
                    className="form-control"
                    placeholder=".col-5"
                  />
                </div>
              </div>
            </div>
            {/* /.card-body */}
          </div>
        </div>
        <div className="col-md-6">
          <div className="card ">
            <div className="card-header">
              <h3 className="card-title">
                <span className="space__align">
                  <MdOutlineContactPhone />
                  Contact Information
                </span>
              </h3>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder=".col-3"
                  />
                </div>
                <div className="col-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder=".col-4"
                  />
                </div>
                <div className="col-5">
                  <input
                    type="text"
                    className="form-control"
                    placeholder=".col-5"
                  />
                </div>
              </div>
            </div>
            {/* /.card-body */}
          </div>
        </div>
      </div>
    </>
  );
}

export default BioData;
