import axios from 'axios';
import React, { useRef, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import useAuth from '../hooks/index.js';
import routes from '../routes.js';
import avatarImages from '../assets/avatar.jpg';

const schemaLogin = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required(),
});

const Login = () => {
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
          return;
        }
        throw err;
      }
    },
  });

  return (
    <div className='container-fluid h-100'>
      <div className='row justify-content-center align-content-center h-100'>
        <div className='col-12 col-md-8 col-xxl-6'>
          <div className='card shadow-sm'>
            <div className='card-body row p-5'>
              <div className='col-12 col-md-6 d-flex align-items-center justify-content-center'>
                <img src={avatarImages}
                className='rounded-circle' alt='Войти'></img>
              </div>
              <Form onSubmit={formik.handleSubmit} className='col-12 col-md-6 mt-3 mt-mb-0'>
                <h1 className='text-center mb-4'>Войти</h1>
                <Form.Group className='form-floating mb-3'>
                  <Form.Control
                  name='username'
                  ref={inputRef}
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  placeholder='Ваш ник'
                  isInvalid={authFailed}
                  id='username'
                  autoComplete='username'
                  required
                  />
                 <Form.Label htmlFor='username'>Ваш ник</Form.Label>
                  </Form.Group>
                  <Form.Group className='form-floating mb-4'>
                    <Form.Control
                    name='password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    placeholder='Пароль'
                    isInvalid={authFailed}
                    type='password'
                    id='password'
                    autoComplete='current-password'
                    required
                    />
                    <Form.Label htmlFor='password'>Пароль</Form.Label>
                    <Form.Control.Feedback type='invalid' tooltip placement='right'>
                    Неверные имя пользователя или пароль
                  </Form.Control.Feedback>
                  </Form.Group>
                  <Button type="submit" variant="outline-primary" className="w-100 mb-3">Войти</Button>
              </Form>
            </div>
            <div className='card-footer p-4'>
              <div className='text-center'>
                <span>Нет аккаунта?</span>
                {' '}
                <a href='/signup'>Регистрация</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
