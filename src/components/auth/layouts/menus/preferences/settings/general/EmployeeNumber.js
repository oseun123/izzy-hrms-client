import React, { useEffect, useState } from "react";
import { Input, Skeleton, Space, Switch } from "antd";
import { useGetEmpNumber } from "../../../../../../../store/actions/preferencesHooksActions";

import { MdEdit, MdFormatBold } from "react-icons/md";

function ToggleActiveState({ payload }) {
  console.log({ payload });
  function onChange(checked) {
    console.log(`switch to ${checked}`);
  }

  return (
    <>
      <div className="row d-flex justify-content-between align-items-center">
        <div className="d-flex flex-column">
          <label className="text-bold-500 "> Enable Auto-Numbering</label>
          <small className="d-none d-sm-block">
            {" "}
            Activate to automatically generate employee numbers during creation
          </small>
        </div>
        <span>
          <Switch defaultChecked onChange={onChange} />
        </span>
      </div>
    </>
  );
}

function CurrentEmployeeNumber({ payload }) {
  return (
    <div className="row d-flex justify-content-between align-items-center mt-3">
      <div className="d-flex flex-column">
        <label className="text-bold-500 "> Number Format</label>
        <small className="d-none d-sm-block">
          {" "}
          Current employee number pattern
        </small>
      </div>
      <span
        className=" p-2 shadow text-bold-500 rounded  text-right"
        style={{ letterSpacing: "3px", width: "120px" }}
      >
        {payload?.format_string || "N/A"}
      </span>
    </div>
  );
}
function PreffixEmployeeNumber({ payload }) {
  return (
    <div className="row d-flex justify-content-between align-items-center mt-3">
      <div className="d-flex flex-column">
        <label className="text-bold-500 "> Prefix Text</label>
        <small className="d-none d-sm-block">
          {" "}
          Customize the prefix for employee numbers to ensure consistency.
        </small>
      </div>
      <span style={{ width: "120px" }}>
        <Input
          addonAfter={<MdEdit style={{ cursor: "pointer", color: "blue" }} />}
          placeholder="Prefix"
        />
      </span>
    </div>
  );
}
function SuffixEmployeeNumber({ payload }) {
  return (
    <div className="row d-flex justify-content-between align-items-center mt-3">
      <div className="d-flex flex-column">
        <label className="text-bold-500 "> Suffix Text</label>
        <small className="d-none d-sm-block">
          {" "}
          Customize the suffix for employee numbers to ensure consistency.
        </small>
      </div>
      <span style={{ width: "120px" }}>
        <Input
          addonAfter={<MdEdit style={{ cursor: "pointer", color: "blue" }} />}
          placeholder="Suffix"
        />
      </span>
    </div>
  );
}

function EmployeeNumber() {
  const [enabled, setEnabled] = useState(true);
  const [num_payload, setNumPayload] = useState(null);

  const { isLoading, data } = useGetEmpNumber(enabled, setEnabled);

  useEffect(() => {
    if (data && Object.keys(data).length) {
      setNumPayload(data?.payload);
    }
  }, [data]);

  return (
    <>
      <div className="col-md-6">
        {/* Main content */}
        <section className="content">
          {/* Default box */}
          <div className="card">
            <div className="card-header">
              <div className="row">
                <h3 className="card-title">Employe Number Settings</h3>
              </div>
              <div className="card-tools">
                <button
                  type="button"
                  className="btn btn-tool"
                  data-card-widget="collapse"
                  data-toggle="tooltip"
                  title="Collapse"
                >
                  <i className="fas fa-minus" />
                </button>
              </div>
            </div>
            <div className="card-body">
              {isLoading ? (
                <Skeleton active />
              ) : (
                <>
                  <ToggleActiveState payload={num_payload} />

                  <CurrentEmployeeNumber payload={num_payload} />
                  <PreffixEmployeeNumber payload={num_payload} />
                  <SuffixEmployeeNumber payload={num_payload} />
                </>
              )}
            </div>
            {/* /.card-body */}
          </div>
          {/* /.card */}
        </section>
        {/* /.content */}
      </div>
    </>
  );
}

export default EmployeeNumber;
