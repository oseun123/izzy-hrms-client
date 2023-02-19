import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Input, Button, Space } from "antd";
import { FormOutlined, EyeOutlined } from "@ant-design/icons";
import classnames from "classnames";

import { validateCreateState } from "../../../../../../util/formValidations";
import {
  updateState,
  preferencesCleanUp,
} from "../../../../../../store/actions/preferencesActions";
import { useGetSystemState } from "../../../../../../store/actions/preferencesHooksActions";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import {
  useShallowEqualSelector,
  useForm,
  useAxiosPrivate,
} from "../../../../../../hooks";
import {
  spinner_preferences,
  message_preferences,
  status_preferences,
  single_system_state,
} from "../../../../../../store/selectors/preferencesSelector";
import Message from "../../../../../helpers/Message";
import PreferencesHero from "../PreferencesHero";

function EditStates() {
  const [enabled, setEnabled] = useState(true);
  const [nam, setNam] = useState("");

  const { id } = useParams();
  useGetSystemState(enabled, setEnabled);
  const dispatch = useDispatch();
  const spinner = useShallowEqualSelector(spinner_preferences);
  const status = useShallowEqualSelector(status_preferences);
  const message = useShallowEqualSelector(message_preferences);
  const request = useAxiosPrivate();

  const single_state = useSelector(
    (state) => single_system_state(state, id),
    shallowEqual
  );

  const state_name = single_state[0]?.name;
  const initValues = {
    name: state_name,
    state_id: id,
  };

  //callback
  function updatestateCallback() {
    console.log(values);
    updateState(dispatch, request, values);
  }

  const { values, errors, handleChange, handleSubmit } = useForm(
    updatestateCallback,
    initValues,
    validateCreateState
  );
  function handleSubmitfist(e) {
    e.preventDefault();

    values.name = document.querySelector("#name").value;

    handleSubmit();
  }
  // set state name incase of refresh
  useEffect(() => {
    values.name = state_name;
    setNam(state_name);
  }, [state_name, values]);

  useEffect(() => {
    return () => {
      return preferencesCleanUp(dispatch);
    };
  }, [dispatch]);

  return (
    <>
      <PreferencesHero />
      {/* Content Header (Page header) */}
      <section className="content-header">
        {message && status ? (
          <Message message={message} status={status} />
        ) : null}
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Edit State</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="/">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Preferences</li>
              </ol>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      {/* Main content */}
      <section className="content">
        {/* Default box */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Edit a state</h3>
            <div className="card-tools"></div>
          </div>
          <form onSubmit={handleSubmitfist}>
            <div className="card-body">
              <div className="row">
                <div className="form-group col-md-6 offset-md-3">
                  <label htmlFor="name">
                    Name <span className="text-danger">*</span>{" "}
                  </label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    allowClear
                    value={values.name}
                    onChange={handleChange}
                    status={errors.name ? "error" : ""}
                    defaultValue={nam}
                  />

                  <div
                    className={classnames(
                      "invalid-feedback",
                      "custom-feedback",
                      {
                        "custom-visibible": errors.name,
                      }
                    )}
                  >
                    {errors.name}
                  </div>
                </div>

                <div className="form-group col-md-6 offset-md-3">
                  <Space>
                    <Button
                      type="primary"
                      icon={<FormOutlined />}
                      loading={spinner}
                      htmlType="submit"
                    >
                      {" "}
                      Update
                    </Button>
                    <Link to="/preferences/view-states">
                      <Button icon={<EyeOutlined />}> View</Button>
                    </Link>
                  </Space>
                </div>
              </div>
            </div>
          </form>
        </div>
        {/* /.card */}
      </section>
      {/* /.content */}
    </>
  );
}

export default EditStates;
