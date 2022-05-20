import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import MiniSpinner from "./../helpers/MiniSpinner";
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
const ResetPassword = () => {
  const { token } = useParams();
  const initData = {
    password: "",
    password_confirm: "",
    token,
  };
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
            <p className="login-box-msg">Enter your new password </p>
            {message && status ? (
              <Message message={message} status={status} />
            ) : null}
            <Spinner color={"primary"} d-hidden mb-2 spinner={spinner} />
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className={classnames("form-control", {
                    "is-invalid": errors.password,
                  })}
                  value={values.password}
                  name="password"
                  onChange={handleChange}
                  placeholder="Enter Password"
                />
                <div className="input-group-append">
                  <div className="input-group-text">
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
              <div className="input-group mb-3">
                <input
                  type="password"
                  className={classnames("form-control", {
                    "is-invalid": errors.password_confirm,
                  })}
                  value={values.password_confirm}
                  name="password_confirm"
                  onChange={handleChange}
                  placeholder="Confirm Password "
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
                <div
                  className={classnames("invalid-feedback", "custom-feedback", {
                    "custom-visibible": errors.password_confirm,
                  })}
                >
                  {errors.password_confirm}
                </div>
              </div>

              <div className="row">
                <div className="col-8"></div>
                {/* /.col */}
                <div className="col-4">
                  <button type="submit" className="btn btn-primary btn-block">
                    Submit
                    <MiniSpinner color="white" d-hidden spinner={spinner} />
                  </button>
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
  );
};

export default ResetPassword;