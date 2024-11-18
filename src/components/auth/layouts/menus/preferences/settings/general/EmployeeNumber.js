import React, { useEffect, useState } from "react";
import { Input, Skeleton, Switch, Button } from "antd";
import { useGetEmpNumber } from "../../../../../../../store/actions/preferencesHooksActions";

import { MdEdit } from "react-icons/md";
import { useAxiosPrivate, useForm } from "../../../../../../../hooks";
import classnames from "classnames";

import {
  updateNumberPrefix,
  updateNumberStatus,
  updateNumberSuffix,
} from "../../../../../../../store/actions/preferencesActions";
import { useDispatch } from "react-redux";

function ToggleActiveState({ payload, refetch }) {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const request = useAxiosPrivate();
  const dispatch = useDispatch();

  console.log({ payload });
  function onChange(checked) {
    setLoading(true);
    setStatus(checked);

    updateNumberStatus(dispatch, request, { status: checked }).then((res) => {
      setLoading(false);
      refetch();
    });
  }

  useEffect(() => {
    if (payload && Object.keys(payload).length) {
      setStatus(payload?.format?.status);
    }
  }, [payload]);

  console.log({ status });
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
          <Switch
            // defaultValue={status}
            value={status}
            onChange={onChange}
            loading={loading}
          />
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
        style={{ letterSpacing: "3px", minWidth: "140px" }}
      >
        {payload?.format_string || "N/A"}
      </span>
    </div>
  );
}
function PrefixEmployeeNumber({ payload, refetch }) {
  const [prefix, setPrefix] = useState("");
  const [creds, setCreds] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const request = useAxiosPrivate();

  //callback
  function formCallback() {
    setLoading(true);
    updateNumberPrefix(dispatch, request, creds).then((res) => {
      setLoading(false);
      if (res?.status === "success") {
        refetch();
      }
    });
  }

  //validation

  function formValidate(values) {
    let errors = {};

    if (values.hasOwnProperty("prefix") && values.prefix === "") {
      errors.prefix = "Prefix cannot not be empty.";
    }

    return errors;
  }

  const { errors, handleSubmit } = useForm(formCallback, creds, formValidate);

  function handleChangeCreds(e, sep = false, creds = {}) {
    if (sep) {
      setCreds((prevValues) => {
        if (!creds.name || creds.value === undefined) {
          return prevValues;
        }
        return { ...prevValues, [creds.name]: creds.value };
      });
    } else if (e && e.target) {
      setCreds((prevValues) => {
        return { ...prevValues, [e.target.name]: e.target.value };
      });
    }
  }

  useEffect(() => {
    if (payload && Object.keys(payload).length) {
      setPrefix(payload?.format?.prefix);
    }
  }, [payload]);

  useEffect(() => {
    setCreds({
      prefix,
    });
  }, [prefix]);

  return (
    <div className="row d-flex justify-content-between align-items-center mt-3">
      <div className="d-flex flex-column">
        <label className="text-bold-500 "> Prefix Text</label>
        <small className="d-none d-sm-block">
          {" "}
          Customize the prefix for employee numbers to ensure consistency.
        </small>
      </div>
      <span style={{ width: "140px" }}>
        <form onSubmit={(e) => handleSubmit(e, creds)}>
          <Input
            addonAfter={
              <Button
                htmlType="submit"
                style={{
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  outline: "none",
                }}
                icon={<MdEdit style={{ color: "blue" }} />}
                size="small"
                loading={loading}
              />
            }
            placeholder="Prefix"
            defaultValue={prefix || null}
            value={creds.prefix || null}
            onChange={handleChangeCreds}
            status={errors.prefix ? "error" : ""}
            name="prefix"
          />
        </form>
        <div
          className={classnames("invalid-feedback", "custom-feedback", {
            "custom-visibible": errors.prefix,
          })}
        >
          {errors.prefix}
        </div>
      </span>
    </div>
  );
}
function SuffixEmployeeNumber({ payload, refetch }) {
  const [suffix, setSuffix] = useState("");
  const [creds, setCreds] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const request = useAxiosPrivate();

  //callback
  function formCallback() {
    setLoading(true);
    updateNumberSuffix(dispatch, request, creds).then((res) => {
      setLoading(false);
      if (res?.status === "success") {
        refetch();
      }
    });
  }

  //validation

  function formValidate(values) {
    let errors = {};
    // no validations
    return errors;
  }

  const { errors, handleSubmit } = useForm(formCallback, creds, formValidate);

  function handleChangeCreds(e, sep = false, creds = {}) {
    if (sep) {
      setCreds((prevValues) => {
        if (!creds.name || creds.value === undefined) {
          return prevValues;
        }
        return { ...prevValues, [creds.name]: creds.value };
      });
    } else if (e && e.target) {
      setCreds((prevValues) => {
        return { ...prevValues, [e.target.name]: e.target.value };
      });
    }
  }

  useEffect(() => {
    if (payload && Object.keys(payload).length) {
      setSuffix(payload?.format?.suffix);
    }
  }, [payload]);

  useEffect(() => {
    setCreds({
      suffix,
    });
  }, [suffix]);

  return (
    <div className="row d-flex justify-content-between align-items-center mt-3 mb-2">
      <div className="d-flex flex-column">
        <label className="text-bold-500 "> Suffix Text</label>
        <small className="d-none d-sm-block">
          {" "}
          Customize the suffix for employee numbers to ensure consistency.
        </small>
      </div>
      <span style={{ width: "140px" }}>
        <form onSubmit={(e) => handleSubmit(e, creds)}>
          <Input
            addonAfter={
              <Button
                htmlType="submit"
                style={{
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  outline: "none",
                }}
                icon={<MdEdit style={{ color: "blue" }} />}
                size="small"
                loading={loading}
              />
            }
            placeholder="Suffix"
            defaultValue={suffix || null}
            value={creds.suffix || null}
            onChange={handleChangeCreds}
            status={errors.suffix ? "error" : ""}
            name="suffix"
          />
        </form>
        <div
          className={classnames("invalid-feedback", "custom-feedback", {
            "custom-visibible": errors.suffix,
          })}
        >
          {errors.suffix}
        </div>
      </span>
    </div>
  );
}

function EmployeeNumber() {
  const [enabled, setEnabled] = useState(true);
  const [num_payload, setNumPayload] = useState(null);

  const { isLoading, data, refetch } = useGetEmpNumber(enabled, setEnabled);

  useEffect(() => {
    if (data && Object.keys(data).length) {
      setNumPayload(data?.payload);
    }
  }, [data]);

  return (
    <>
      <div className="col-md-6">
        {/* Main content */}
        <section className="content col-md-12">
          {/* Default box */}
          <div className="card">
            <div className="card-header">
              <div className="row justify-content-between">
                <h3 className="card-title">Employe Number Settings</h3>
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
            </div>
            <div className="card-body">
              {isLoading ? (
                <Skeleton active />
              ) : (
                <>
                  <ToggleActiveState payload={num_payload} refetch={refetch} />

                  <CurrentEmployeeNumber
                    payload={num_payload}
                    refetch={refetch}
                  />
                  <PrefixEmployeeNumber
                    payload={num_payload}
                    refetch={refetch}
                  />
                  <SuffixEmployeeNumber
                    payload={num_payload}
                    refetch={refetch}
                  />
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
