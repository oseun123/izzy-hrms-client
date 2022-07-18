import React from "react";
import { useForm } from "../../hooks";
import MiniSpinner from "./../helpers/MiniSpinner";
import Message from "./../helpers/Message";
import Spinner from "./../helpers/Spinner";
import { Link, useHistory } from "react-router-dom";
import classnames from "classnames";

import { useDispatch, useSelector } from "react-redux";
import { loginForm } from "../../util/formValidations";
import { login } from "./../../store/actions/userActions";
const Login = () => {
  const initLoginUser = {
    email: "",
    password: "",
  };

  const { spinner, message, status } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  // callback
  const loginUserFromForm = () => {
    login(dispatch, values, history);
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

            <Spinner color={"primary"} d-hidden mb-2 spinner={spinner} />
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className={classnames("form-control", {
                    "is-invalid": errors.email,
                  })}
                  value={values.email}
                  name="email"
                  onChange={handleChange}
                  placeholder="Enter Email"
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope" />
                  </div>
                </div>

                <div
                  className={classnames("invalid-feedback", "custom-feedback", {
                    "custom-visibible": errors.email,
                  })}
                >
                  {errors.email}
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className={classnames("form-control", {
                    "is-invalid": errors.password,
                  })}
                  value={values.password}
                  onChange={handleChange}
                  name="password"
                  placeholder="Enter Password"
                />
                <div className="input-group-append">
                  <div className="input-group-text text-primary">
                    <span className="fas fa-lock" />
                  </div>
                </div>

                <div
                  className={classnames("invalid-feedback", "custom-feedback", {
                    "custom-visibible": errors.password,
                  })}
                >
                  {errors.password}
                </div>
              </div>
              <div className="row">
                <div className="col-8"></div>
                {/* /.col */}
                <div className="col-4">
                  <button type="submit" className="btn btn-primary btn-block">
                    <span>
                      Sign In
                      <MiniSpinner color="white" d-hidden spinner={spinner} />
                    </span>
                  </button>
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
