import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import Message from "./../helpers/Message";
import Spinner from "./../helpers/Spinner";
import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import {
  requestPasswordLink,
  resetUsersState,
} from "../../store/actions/userActions";
import { useForm } from "../../hooks";
import { requestLink } from "../../util/formValidations";
import { Input, Button } from "antd";
import { SendOutlined, MailOutlined } from "@ant-design/icons";
import { current_cleint } from "../../store/selectors/userSelectors";
import { useShallowEqualSelector } from "../../hooks";
import styles from "../styles/layout/Layout.module.css";
import AminatedLayout from "../ui/AminatedLayout";
const ForgetPassword = () => {
  const initEmail = {
    email: "",
  };
  const currentCleint = useShallowEqualSelector(current_cleint);
  const dispatch = useDispatch();
  const { spinner, message, status } = useSelector((state) => state.user);
  // callback
  const sendResetLinkFromForm = () => {
    requestPasswordLink(dispatch, values).then((res) => {
      if (res?.status === "success") {
        clearForm();
      }
    });
  };

  const { values, errors, handleChange, handleSubmit, clearForm } = useForm(
    sendResetLinkFromForm,
    initEmail,
    requestLink
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
              <p className="login-box-msg">Enter Email to get a reset link </p>
              {message && status ? (
                <Message message={message} status={status} />
              ) : null}
              <Spinner color="secondary" d-hidden mb-2 spinner={spinner} />
              <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                  <Input
                    allowClear
                    status={errors.email ? "error" : ""}
                    type="text"
                    value={values.email}
                    name="email"
                    onChange={handleChange}
                    placeholder="Enter Email"
                    addonBefore={<MailOutlined className="text-secondary" />}
                  />

                  <div
                    className={classnames(
                      "invalid-feedback",
                      "custom-feedback",
                      {
                        "custom-visibible": errors.email,
                      }
                    )}
                  >
                    {errors.email}
                  </div>
                </div>

                <div className="row">
                  <div className="col-4"></div>
                  {/* /.col */}
                  <div className="col-8 text-right">
                    <Button
                      type="primary"
                      icon={<SendOutlined />}
                      loading={spinner}
                      htmlType="submit"
                      className={styles.on_hover}
                    >
                      Send
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

export default ForgetPassword;
