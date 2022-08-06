import React, { useEffect } from 'react';
import axios from 'axios';
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
      console.log(data);
    };
    fetchData();
  }, []);

  return (
        <div>
            Chat General
        </div>
  );
};

export default Chat;
// Реализуйте получение данных с сервера при открытии с
// траницы с чатом авторизованным пользователем.
// Интерфейс обработчика запроса смотрите в файле routes.js
// серверной части.
