import React, { useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import Spinner from './../helpers/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import {
  requestSetupPassword,
  resetUsersState,
} from '../../store/actions/userActions';
import { useCleanUp, useForm, useUserNotification } from '../../hooks';
import { validatSetupPassword } from '../../util/formValidations';
import { Input, Button } from 'antd';
import {
  CheckCircleOutlined,
  LockOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
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
      <div
        className="hold-transition login-page"
        style={{
          height: '100vh',
          background: '#f8fafd',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        {/* WAVE EFFECT STYLES */}
        <style>{`
          @keyframes floatWave {
            0% { transform: translate(-15px, -20px) scale(1) rotate(0deg); }
            25% { transform: translate(20px, -25px) scale(1.05) rotate(5deg); }
            50% { transform: translate(15px, 15px) scale(0.97) rotate(-7deg); }
            75% { transform: translate(-20px, 10px) scale(1.03) rotate(3deg); }
            100% { transform: translate(-15px, -20px) scale(1) rotate(0deg); }
          }
        `}</style>

        {/* Primary Wave Shape */}
        <div
          style={{
            position: 'absolute',
            top: '10%',
            left: '8%',
            width: '450px',
            height: '450px',
            background:
              'radial-gradient(circle at 30% 40%, color-mix(in srgb, var(--primary) 25%, transparent), transparent 65%)',
            borderRadius: '45% 55% 40% 60% / 55% 35% 65% 45%',
            animation: 'floatWave 12s ease-in-out infinite',
            opacity: 1,
            zIndex: 0,
            pointerEvents: 'none',
          }}
        ></div>

        {/* Secondary Wave Shape */}
        <div
          style={{
            position: 'absolute',
            bottom: '15%',
            right: '5%',
            width: '500px',
            height: '500px',
            background:
              'radial-gradient(circle at 70% 60%, color-mix(in srgb, var(--primary) 25%, transparent), transparent 70%)',
            borderRadius: '55% 45% 65% 35% / 40% 60% 40% 60%',
            animation: 'floatWave 15s ease-in-out infinite 2s',
            opacity: 1,
            zIndex: 0,
            pointerEvents: 'none',
          }}
        ></div>

        <div
          className="login-box"
          style={{
            maxWidth: '420px',
            width: '100%',
            padding: '20px 15px 0',
            margin: '0 auto',
            flex: '0 0 auto',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <div className="text-center mb-4">
            <h1
              className="mb-3"
              style={{
                fontSize: '2.2rem',
                fontWeight: 600,
                letterSpacing: '-0.5px',
              }}
            >
              <Link to="#">{currentCleint.name} HRMS</Link>
            </h1>
            <p className="text-muted" style={{ lineHeight: '1.4' }}>
              Welcome! Set up your account password to get started
            </p>
          </div>

          <div
            className="card border-0 shadow-lg"
            style={{ borderRadius: '16px' }}
          >
            <div className="card-body p-4">
              <Spinner position={'right'} className="mb-4" />

              <form onSubmit={handleSubmit}>
                {/* Password Field */}
                <div className="mb-3">
                  <label className="form-label text-gray-600 mb-2 d-block">
                    Password
                  </label>
                  <Input.Password
                    allowClear
                    status={errors.password ? 'error' : ''}
                    value={values.password}
                    name="password"
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="py-3"
                    prefix={<LockOutlined style={{ color: '#6c757d' }} />}
                    style={{
                      borderRadius: '10px',
                      borderColor: 'rgba(0,0,0,0.1)',
                    }}
                  />
                  <div className="mt-2" style={{ minHeight: '24px' }}>
                    {errors.password && (
                      <div className="text-danger small animate-fade-in">
                        {errors.password}
                      </div>
                    )}
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div className="mb-3">
                  <label className="form-label text-gray-600 mb-2 d-block">
                    Confirm Password
                  </label>
                  <Input.Password
                    allowClear
                    status={errors.password_confirmation ? 'error' : ''}
                    value={values.password_confirmation}
                    name="password_confirmation"
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="py-3"
                    prefix={<LockOutlined style={{ color: '#6c757d' }} />}
                    style={{
                      borderRadius: '10px',
                      borderColor: 'rgba(0,0,0,0.1)',
                    }}
                  />
                  <div className="mt-2" style={{ minHeight: '24px' }}>
                    {errors.password_confirmation && (
                      <div className="text-danger small animate-fade-in">
                        {errors.password_confirmation}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-3">
                  <Button
                    type="primary"
                    icon={<CheckCircleOutlined />}
                    loading={spinner}
                    htmlType="submit"
                    block
                    size="large"
                    className={styles.on_hover}
                  >
                    Complete Setup
                  </Button>
                </div>

                {/* Back to Login Link */}
                <div className="text-center mt-4">
                  <Link
                    to="/login"
                    className="small d-inline-flex align-items-center"
                    style={{ textDecoration: 'none' }}
                  >
                    <ArrowLeftOutlined
                      style={{ fontSize: '12px', marginRight: '6px' }}
                    />
                    Back to Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AminatedLayout>
  );
};

export default SetupPassword;
