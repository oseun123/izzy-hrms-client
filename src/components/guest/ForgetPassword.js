import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import MiniSpinner from "./../helpers/MiniSpinner";
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
const ForgetPassword = () => {
  const initEmail = {
    email: "",
  };
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
            <p className="login-box-msg">Enter Email to get a reset link </p>
            {message && status ? (
              <Message message={message} status={status} />
            ) : null}
            <Spinner color="secondary" d-hidden mb-2 spinner={spinner} />
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

              <div className="row">
                <div className="col-8"></div>
                {/* /.col */}
                <div className="col-4">
                  <button
                    type="submit"
                    className="btn btn-primary d-flex"
                    disabled={spinner}
                  >
                    <span className="shift_up">
                      Submit
                      <MiniSpinner color="white" d-hidden spinner={spinner} />
                    </span>
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

export default ForgetPassword;
