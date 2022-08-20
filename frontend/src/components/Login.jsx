import axios from 'axios';
import React, { useRef, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import useAuth from '../hooks/index.js';
import routes from '../routes.js';

const schemaLogin = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required(),
});

const Login = () => {
  const auth = useAuth();
  const location = useLocation();
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [authFailed, setAuthFailed] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    schemaLogin,
    onSubmit: async (values) => {
      console.log('values', values);
      try {
        const response = await axios.post(routes.loginPath(), values);
        console.log('response', response.data);
        auth.logIn(response.data);
        // localStorage.setItem('user', JSON.stringify(response.data));
        // auth.logIn();
        const { from } = location.state || { from: { pathname: '/' } };
        console.log('from', from);
        navigate(from);
        // console.log(from);
      } catch (err) {
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
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
                <img src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAZABkAAD/7AARRHVja3kAAQAEAAAAPAAA/+EDimh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjNmN2RmMzZmLTI1MDAtNDU4Zi1iODM2LWE0ODE1Yzc4MjU4ZSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0NEQ2MThFMzA3QTExMUVCOTI0M0Y2QUQ5MTQzNUJERCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0NEQ2MThFMjA3QTExMUVCOTI0M0Y2QUQ5MTQzNUJERCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5ZTczYWM1NS0wMmMyLTRiOTAtOTZhNi1mYWYxYTA5ODFlNmMiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpjMmIxYmVjZS0xNDRmLThkNDItOTJjMS1hNjAxY2UwNjdjY2YiLz4gPC9yZGY6RGVzY3JpcHRp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'
                className='rounded-circle' alt='Войти'></img>
              </div>
              <Form onSubmit={formik.handleSubmit}>
                <h1 className='class="text-center mb-4'>Войти</h1>
                <Form.Group className='form-floating mb-3'>
                  <Form.Control
                  name='username'
                  ref={inputRef}
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  placeholder='username'
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
                    placeholder='password'
                    isInvalid={authFailed}
                    type='password'
                    id='password'
                    autoComplete='current-password'
                    required
                    />
                    <Form.Label htmlFor='password'>Пароль</Form.Label>
                    <Form.Control.Feedback type="invalid">
                    Неверные имя пользователя или пароль
                  </Form.Control.Feedback>
                  </Form.Group>
                  <Button type="submit" variant="outline-primary" className="w-100 mb-3">Войти</Button>
              </Form>
            </div>
            <div className='card-footer p-4'>
              <div className='text-center'>
                <span>Нет аккаунта? Регистрация</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
