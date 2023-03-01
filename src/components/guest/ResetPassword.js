import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import Message from "./../helpers/Message";
import Spinner from "./../helpers/Spinner";
import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import {
  resetPassword,
  resetUsersState,
} from "../../store/actions/userActions";
import { useForm } from "../../hooks";
import { validatResetPassword } from "../../util/formValidations";
import { Input, Button } from "antd";
import { LockOutlined, SyncOutlined } from "@ant-design/icons";
import { current_cleint } from "../../store/selectors/userSelectors";
import { useShallowEqualSelector } from "../../hooks";
import styles from "../styles/layout/Layout.module.css";
import AminatedLayout from "../ui/AminatedLayout";

const ResetPassword = () => {
  const { token } = useParams();
  const initData = {
    password: "",
    password_confirm: "",
    token,
  };

  const currentCleint = useShallowEqualSelector(current_cleint);

  const dispatch = useDispatch();
  const { spinner, message, status } = useSelector((state) => state.user);
  // callback
  const ResetPasswordFromForm = () => {
    resetPassword(dispatch, values).then((res) => {
      if (res?.status === "success") {
        clearForm();
      }
    });
  };

  const { values, errors, handleChange, handleSubmit, clearForm } = useForm(
    ResetPasswordFromForm,
    initData,
    validatResetPassword
  );
  useEffect(() => {
    return () => resetUsersState(dispatch);
  }, [dispatch]);

  return (
    <AminatedLayout>
      <div className="hold-transition login-page">
        <div className="login-box">
          <div className="login-logo">{currentCleint.name} HRMS</div>
          {/* /.login-logo */}
          <div className="card">
            <div className="card-body login-card-body">
              <p className="login-box-msg">Enter your new password </p>
              {message && status ? (
                <Message message={message} status={status} />
              ) : null}
              <Spinner color="secondary" d-hidden mb-2 spinner={spinner} />
              <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                  <Input.Password
                    status={errors.password ? "error" : ""}
                    allowClear
                    value={values.password}
                    name="password"
                    onChange={handleChange}
                    placeholder="Enter Password"
                    addonBefore={<LockOutlined className="text-secondary" />}
                  />

                  <div
                    className={classnames(
                      "invalid-feedback",
                      "custom-feedback",
                      {
                        "custom-visibible": errors.password,
                      }
                    )}
                  >
                    {errors.password}
                  </div>
                </div>
                <div className="input-group mb-3">
                  <Input.Password
                    status={errors.password_confirm ? "error" : ""}
                    allowClear
                    value={values.password_confirm}
                    name="password_confirm"
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    addonBefore={<LockOutlined className="text-secondary" />}
                  />

                  <div
                    className={classnames(
                      "invalid-feedback",
                      "custom-feedback",
                      {
                        "custom-visibible": errors.password_confirm,
                      }
                    )}
                  >
                    {errors.password_confirm}
                  </div>
                </div>

                <div className="row">
                  <div className="col-4"></div>
                  {/* /.col */}
                  <div className="col-8 text-right">
                    <Button
                      type="primary"
                      icon={<SyncOutlined />}
                      loading={spinner}
                      htmlType="submit"
                      className={styles.on_hover}
                    >
                      Reset
                    </Button>
                  </div>
                  {/* /.col */}
                </div>
              </form>

              {/* /.social-auth-links */}
              <p className="mb-1">
                <Link to="/login">Login page</Link>
              </p>
            </div>
            {/* /.login-card-body */}
          </div>
        </div>
      </div>
    </AminatedLayout>
  );
};

export default ResetPassword;
