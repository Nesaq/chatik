/* eslint-disable max-len */
import React, { useRef, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';
import {
  Container, Row, Col, Form, Card, Button,
} from 'react-bootstrap';
import routes from '../routes.js';
import useAuth from '../hooks/index.js';

const schemeForSignUpPage = yup.object().shape({
  username: yup
    .string()
    .required('Обязательное поле')
    .trim()
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов'),
  password: yup
    .string()
    .required('Обязательное поле')
    .trim()
    .min(6, 'Не менее 6 символов'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Пароли должны совпадать'),
});

const SignupPage = () => {
  const auth = useAuth();
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [signupFailed, setSignup] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
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
          inputRef.current.select();
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
                                <h1 className='text-center mb-4'>Регистрация</h1>
                                <Form.Group className='form-floating mb-3'>
                                    <Form.Control
                                        name='username'
                                        id='username'
                                        placeholder='От 3 до 20 символов'
                                        autoComplete='username'
                                        value={formik.values.username}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={(formik.touched.username && formik.errors.username) || signupFailed}
                                        ref={inputRef}
                                        required
                                        />
                                        <Form.Label htmlFor="username">Имя пользователя</Form.Label>
                                        <Form.Control.Feedback type='invalid' tooltip placement='right'>
                                            {formik.errors.username}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="form-floating mb-3">
                                    <Form.Control
                                        name='password'
                                        type='password'
                                        id='password'
                                        placeholder='Пароль'
                                        autoComplete='new-password'
                                        aria-describedby="passwordHelpBlock"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={(formik.touched.password && formik.errors.password) || signupFailed}
                                        required
                                    />
                                   <Form.Control.Feedback type='invalid' tooltip>
                                            {formik.errors.username}
                                   </Form.Control.Feedback>
                                   <Form.Label htmlFor="password">Пароль</Form.Label>
                                   </Form.Group>
                                <Form.Group className='form-floating mb-4'>
                                    <Form.Control
                                        name='confirmPassword'
                                        id="confirmPassword"
                                        type='password'
                                        placeholder='Повторите пароль'
                                        autoComplete='new-password'
                                        value={formik.values.confirmPassword}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={(formik.touched.confirmPassword && formik.errors.confirmPassword) || signupFailed}
                                        required
                                    />
                                    <Form.Control.Feedback type='invalid' tooltip>
                                      {signupFailed ? 'Пользователь уже существует' : formik.errors.confirmPassword}
                                    </Form.Control.Feedback>
                                    <Form.Label htmlFor="confirmPassword">Повторите пароль</Form.Label>
                                    </Form.Group>
                            <Button className='w-100' type='submit' variant='outline-primary'>Зарегистрироваться</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
  );
};

export default SignupPage;
