import axios from 'axios';
import React, { useRef, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import useAuth from '../hooks/useAuth.js';
import routes from '../routes.js';
import avatarImages from '../assets/avatar.jpg';

const schemaLogin = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required(),
});

const Login = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [authFailed, setAuthFailed] = useState(false);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: schemaLogin,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(routes.loginPath(), values);
        auth.logIn(response.data);
        navigate('/');
      } catch (err) {
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current?.select();
        } else {
          toast.error(t('networkError'));
          throw err;
        }
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img
                  alt={t('login.header')}
                  className="rounded-circle"
                  src={avatarImages}
                />
              </div>

              <Form
                className="col-12 col-md-6 mt-3 mt-mb-0"
                onSubmit={formik.handleSubmit}
              >
                <h1 className="text-center mb-4">
                  {t('login.header')}
                </h1>

                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    autoComplete="username"
                    id="username"
                    isInvalid={authFailed}
                    name="username"
                    onChange={formik.handleChange}
                    placeholder={t('login.username')}
                    ref={inputRef}
                    required
                    value={formik.values.username}
                  />

                  <Form.Label htmlFor="username">
                    {t('login.username')}
                  </Form.Label>
                </Form.Group>

                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    autoComplete="current-password"
                    id="password"
                    isInvalid={authFailed}
                    name="password"
                    onChange={formik.handleChange}
                    placeholder={t('login.password')}
                    required
                    type="password"
                    value={formik.values.password}
                  />

                  <Form.Label htmlFor="password">
                    {t('login.password')}
                  </Form.Label>

                  <Form.Control.Feedback
                    placement="right"
                    tooltip
                    type="invalid"
                  >
                    {t('login.authFailed')}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button
                  className="w-100 mb-3"
                  type="submit"
                  variant="outline-primary"
                >
                  {t('login.submit')}
                </Button>
              </Form>
            </div>

            <div className="card-footer p-4">
              <div className="text-center">
                <span>
                  {t('login.newToChat')}
                </span>

                {' '}

                <a href="/signup">
                  {t('login.signup')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
