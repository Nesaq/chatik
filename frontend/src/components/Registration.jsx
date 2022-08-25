/* eslint-disable max-len */
import React, { useRef, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';
import {
  Container, Row, Col, Form, Card, Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import routes from '../routes.js';
import useAuth from '../hooks/useAuth.js';

const SignupPage = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [signupFailed, setSignup] = useState(false);

  const schemeForSignUpPage = yup.object().shape({
    username: yup
      .string()
      .required(t('signup.required'))
      .trim()
      .min(3, t('signup.usernameConstraints'))
      .max(20, t('signup.usernameConstraints')),
    password: yup
      .string()
      .required(t('signup.required'))
      .trim()
      .min(6, t('signup.passMin')),
    confirmPassword: yup
      .string()
      .required(t('signup.required'))
      .oneOf([yup.ref('password')], t('signup.mustMatch')),
  });

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: schemeForSignUpPage,
    onSubmit: async (values) => {
      console.log(values);
      try {
        const response = await axios.post(routes.signupPath(), { username: values.username, password: values.password });
        console.log(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
        auth.logIn(response.data);
        navigate('/');
      } catch (err) {
        if (err.isAxiosError && err.response.status === 409) {
          setSignup(true);
          inputRef.current?.select();
        } else {
          toast.error(t('networkError'), {
            position: 'top-right',
          });
          throw err;
        }
      }
    },
  });
  return (
    <Container
      className="h-100"
      fluid
    >
      <Row className="justify-content-center align-content-center h-100">
        <Col
          md={8}
          xxl={6}
        >
          <Card className="shadow-sm">
            <Card.Body className="p-5">
              <Form
                className="w-100"
                onSubmit={formik.handleSubmit}
              >
                <h1 className="text-center mb-4">
                  {t('signup.header')}
                </h1>

                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    autoComplete="username"
                    id="username"
                    isInvalid={(formik.touched.username && formik.errors.username) || signupFailed}
                    name="username"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    placeholder={t('signup.usernameConstraints')}
                    ref={inputRef}
                    required
                    value={formik.values.username}
                  />

                  <Form.Label htmlFor="username">
                    {t('signup.username')}
                  </Form.Label>

                  <Form.Control.Feedback
                    placement="right"
                    tooltip
                    type="invalid"
                  >
                    {formik.errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    aria-describedby="passwordHelpBlock"
                    autoComplete="new-password"
                    id="password"
                    isInvalid={(formik.touched.password && formik.errors.password) || signupFailed}
                    name="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    placeholder={t('signup.passMin')}
                    required
                    type="password"
                    value={formik.values.password}
                  />

                  <Form.Control.Feedback
                    tooltip
                    type="invalid"
                  >
                    {formik.errors.password}
                  </Form.Control.Feedback>

                  <Form.Label htmlFor="password">
                    {t('signup.password')}
                  </Form.Label>
                </Form.Group>

                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    autoComplete="new-password"
                    id="confirmPassword"
                    isInvalid={(formik.touched.confirmPassword && formik.errors.confirmPassword) || signupFailed}
                    name="confirmPassword"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    placeholder={t('signup.mustMatch')}
                    required
                    type="password"
                    value={formik.values.confirmPassword}
                  />

                  <Form.Control.Feedback
                    tooltip
                    type="invalid"
                  >
                    {signupFailed ? t('signup.alreadyExists') : formik.errors.confirmPassword}
                  </Form.Control.Feedback>

                  <Form.Label htmlFor="confirmPassword">
                    {t('signup.confirm')}
                  </Form.Label>
                </Form.Group>

                <Button
                  className="w-100"
                  type="submit"
                  variant="outline-primary"
                >
                  {t('signup.submit')}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupPage;
