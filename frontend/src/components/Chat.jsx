import React, { useEffect } from 'react';
import axios from 'axios';
import { Container, Row } from 'react-bootstrap';
// import { Form, Button } from 'react-bootstrap';
// import { useFormik } from 'formik';
// import { useDispatch } from 'redux-toolkit';
import useAuth from '../hooks/index.js';
import routes from '../routes.js';

const Chat = () => {
  const auth = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(routes.dataPath(), { headers: auth.getAuthHeader() });
      //   console.log(data);
      return data;
    };
    fetchData();
  }, []);

  return (
        <Container className='h-100 my-4 overflow-hidden rounded shadow'>
            <Row className='h-100 bg-white'>
           <p>Каналы</p>
           <p>Сообщения</p>
            </Row>
        </Container>
  );
};

export default Chat;
// Реализуйте получение данных с сервера при открытии с
// траницы с чатом авторизованным пользователем.
// Интерфейс обработчика запроса смотрите в файле routes.js
// серверной части.
