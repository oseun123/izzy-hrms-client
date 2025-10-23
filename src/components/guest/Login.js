import React, { useEffect } from 'react';
import { useCleanUp, useForm, useUserNotification } from '../../hooks';
import Spinner from './../helpers/Spinner';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginForm } from '../../util/formValidations';
import { login } from './../../store/actions/userActions';
import { resetUsersState } from '../../store/actions/userActions';
import { Input, Button } from 'antd';
import { LoginOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { current_cleint } from '../../store/selectors/userSelectors';
import { useShallowEqualSelector } from '../../hooks';
import AminatedLayout from '../ui/AminatedLayout';
import styles from '../styles/layout/Layout.module.css';

const Login = () => {
  useUserNotification();
  useCleanUp();
  const initLoginUser = {
    email: '',
    password: '',
  };

  const currentCleint = useShallowEqualSelector(current_cleint);

  const { spinner } = useSelector((state) => state.user);
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
    loginForm,
  );

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
            // filter: 'blur(25px)',
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
            // filter: 'blur(30px)',
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
              Welcome back! Please login to continue
            </p>
          </div>

          <div
            className="card border-0 shadow-lg"
            style={{ borderRadius: '16px' }}
          >
            <div className="card-body p-4">
              <Spinner position={'right'} className="mb-4" />

              <form onSubmit={handleSubmit}>
                {/* Email Field */}
                <div className="mb-3">
                  <label className="form-label text-gray-600 mb-2 d-block">
                    Email Address
                  </label>
                  <Input
                    allowClear
                    status={errors.email ? 'error' : ''}
                    type="text"
                    value={values.email}
                    name="email"
                    onChange={handleChange}
                    placeholder="name@company.com"
                    className="py-3"
                    prefix={<MailOutlined style={{ color: '#6c757d' }} />}
                    style={{
                      borderRadius: '10px',
                      borderColor: 'rgba(0,0,0,0.1)',
                    }}
                  />
                  <div className="mt-2" style={{ minHeight: '24px' }}>
                    {errors.email && (
                      <div className="text-danger small animate-fade-in">
                        {errors.email}
                      </div>
                    )}
                  </div>
                </div>

                {/* Password Field */}
                <div className="mb-3">
                  <div className="d-flex justify-content-between mb-2">
                    <label className="form-label text-gray-600">Password</label>
                    <Link to="/forget-password" className="small">
                      Forgot password?
                    </Link>
                  </div>
                  <Input.Password
                    allowClear
                    status={errors.password ? 'error' : ''}
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    name="password"
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

                <div className="mb-3">
                  <Button
                    type="primary"
                    icon={<LoginOutlined />}
                    loading={spinner}
                    htmlType="submit"
                    block
                    size="large"
                    className={styles.on_hover}
                  >
                    Sign In
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AminatedLayout>
  );
};

export default Login;
