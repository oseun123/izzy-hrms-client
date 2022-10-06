import React, { useEffect } from "react";
import { useForm } from "../../hooks";
import Message from "./../helpers/Message";
import Spinner from "./../helpers/Spinner";
import { Link, useHistory, useLocation } from "react-router-dom";
import classnames from "classnames";

import { useDispatch, useSelector } from "react-redux";
import { loginForm } from "../../util/formValidations";
import { login } from "./../../store/actions/userActions";
import { resetUsersState } from "../../store/actions/userActions";
import { Input, Button } from "antd";
import { LoginOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";

const Login = () => {
  const initLoginUser = {
    email: "",
    password: "",
  };

  const { spinner, message, status } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    return () => {
      resetUsersState(dispatch);
    };
  }, [dispatch]);
  // callback
  const loginUserFromForm = () => {
    login(dispatch, values, history, location);
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    loginUserFromForm,
    initLoginUser,
    loginForm
  );

  return (
    <div className="hold-transition login-page">
      <div className="login-box">
        <div className="login-logo">
          <Link to={() => false}>
            <b>Izzy</b>HRMS
          </Link>
        </div>
        {/* /.login-logo */}
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Sign in to start your session</p>
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
                  className={classnames("invalid-feedback", "custom-feedback", {
                    "custom-visibible": errors.email,
                  })}
                >
                  {errors.email}
                </div>
              </div>
              <div className="input-group mb-3">
                <Input.Password
                  allowClear
                  status={errors.password ? "error" : ""}
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  name="password"
                  placeholder="Enter Password"
                  addonBefore={<LockOutlined className="text-secondary" />}
                />

                <div
                  className={classnames("invalid-feedback", "custom-feedback", {
                    "custom-visibible": errors.password,
                  })}
                >
                  {errors.password}
                </div>
              </div>
              <div className="row">
                <div className="col-4"></div>
                {/* /.col */}
                <div className="col-8 text-right">
                  <Button
                    type="primary"
                    icon={<LoginOutlined />}
                    loading={spinner}
                    htmlType="submit"
                  >
                    {" "}
                    Sign In
                  </Button>
                </div>
                {/* /.col */}
              </div>
            </form>

            {/* /.social-auth-links */}
            <p className="mb-1">
              <Link to="/forget-password">I forgot my password</Link>
            </p>
          </div>
          {/* /.login-card-body */}
        </div>
      </div>
    </div>
  );
};

export default Login;
