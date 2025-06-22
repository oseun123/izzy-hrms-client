import React, { useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';

import Spinner from './../helpers/Spinner';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import {
  requestSetupPassword,
  resetUsersState,
} from '../../store/actions/userActions';
import { useCleanUp, useForm, useUserNotification } from '../../hooks';
import { validatSetupPassword } from '../../util/formValidations';
import { Input, Button } from 'antd';
import { SendOutlined, LockOutlined } from '@ant-design/icons';
import { current_cleint } from '../../store/selectors/userSelectors';
import { useShallowEqualSelector } from '../../hooks';
import styles from '../styles/layout/Layout.module.css';
import AminatedLayout from '../ui/AminatedLayout';
const SetupPassword = () => {
  const { search } = useLocation();
  const history = useHistory();
  const query = new URLSearchParams(search);
  const token = query.get('token');

  useUserNotification();
  useCleanUp();
  const initData = {
    password: '',
    password_confirmation: '',
    setup_token: token,
  };
  const currentCleint = useShallowEqualSelector(current_cleint);
  const dispatch = useDispatch();
  const { spinner } = useSelector((state) => state.user);
  // callback
  const sendSetupPasswordFromForm = () => {
    requestSetupPassword(dispatch, values).then((res) => {
      if (res?.status === 'success') {
        clearForm();
        setTimeout(() => {
          history.push('/login');
        }, [1000]);
      }
    });
  };

  const { values, errors, handleChange, handleSubmit, clearForm } = useForm(
    sendSetupPasswordFromForm,
    initData,
    validatSetupPassword,
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
              <p className="login-box-msg">Setup account password </p>

              <Spinner mb-2 />
              <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                  <Input.Password
                    allowClear
                    status={errors.password ? 'error' : ''}
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    name="password"
                    placeholder="Enter Password"
                    addonBefore={<LockOutlined className="text-secondary" />}
                  />

                  <div
                    className={classnames(
                      'invalid-feedback',
                      'custom-feedback',
                      {
                        'custom-visibible': errors.password,
                      },
                    )}
                  >
                    {errors.password}
                  </div>
                </div>
                <div className="input-group mb-3">
                  <Input.Password
                    allowClear
                    status={errors.password_confirmation ? 'error' : ''}
                    type="password"
                    value={values.password_confirmation}
                    onChange={handleChange}
                    name="password_confirmation"
                    placeholder="Confirm Password"
                    addonBefore={<LockOutlined className="text-secondary" />}
                  />

                  <div
                    className={classnames(
                      'invalid-feedback',
                      'custom-feedback',
                      {
                        'custom-visibible': errors.password_confirmation,
                      },
                    )}
                  >
                    {errors.password_confirmation}
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
                      Setup
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

export default SetupPassword;
