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

import routes from '../routes.js';
import useAuth from '../hooks/index.js';

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
        console.log('RESPONSE DATA FROM SIGN UP', response.data);
        auth.logIn(response.data);
        navigate('/');
      } catch (err) {
        if (err.isAxiosError && err.response.status === 409) {
          setSignup(true);
          inputRef.current?.select();
          return;
        }
        throw err;
      }
    },
  });
  return (
        <Container fluid className='h-100'>
            <Row className='justify-content-center align-content-center h-100'>
                <Col md={8} xxl={6}>
                    <Card className='shadow-sm'>
                        <Card.Body className='p-5'>
                            <Form onSubmit={formik.handleSubmit} className='w-100'>
                                <h1 className='text-center mb-4'>{t('signup.header')}</h1>
                                <Form.Group className='form-floating mb-3'>
                                    <Form.Control
                                        name='username'
                                        id='username'
                                        placeholder={t('signup.usernameConstraints')}
                                        autoComplete='username'
                                        value={formik.values.username}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={(formik.touched.username && formik.errors.username) || signupFailed}
                                        ref={inputRef}
                                        required
                                        />
                                        <Form.Label htmlFor="username">{t('signup.usernameConstraints')}</Form.Label>
                                        <Form.Control.Feedback type='invalid' tooltip placement='right'>
                                            {formik.errors.username}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="form-floating mb-3">
                                    <Form.Control
                                        name='password'
                                        type='password'
                                        id='password'
                                        placeholder={t('signup.passMin')}
                                        autoComplete='new-password'
                                        aria-describedby="passwordHelpBlock"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={(formik.touched.password && formik.errors.password) || signupFailed}
                                        required
                                    />
                                   <Form.Control.Feedback type='invalid' tooltip>
                                            {formik.errors.password}
                                   </Form.Control.Feedback>
                                   <Form.Label htmlFor="password">{t('signup.password')}</Form.Label>
                                   </Form.Group>
                                <Form.Group className='form-floating mb-4'>
                                    <Form.Control
                                        name='confirmPassword'
                                        id="confirmPassword"
                                        type='password'
                                        placeholder={t('signup.mustMatch')}
                                        autoComplete='new-password'
                                        value={formik.values.confirmPassword}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={(formik.touched.confirmPassword && formik.errors.confirmPassword) || signupFailed}
                                        required
                                    />
                                    <Form.Control.Feedback type='invalid' tooltip>
                                      {signupFailed ? t('signup.alreadyExists') : formik.errors.confirmPassword}
                                    </Form.Control.Feedback>
                                    <Form.Label htmlFor="confirmPassword">{t('signup.confirm')}</Form.Label>
                                    </Form.Group>
                            <Button className='w-100' type='submit' variant='outline-primary'>{t('signup.submit')}</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
  );
};

export default SignupPage;
