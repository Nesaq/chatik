import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Button, Form, InputGroup } from 'react-bootstrap';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import useSocket from '../../hooks/useSocket';

const validationMessagesForm = yup.object().shape({
  body: yup
    .string()
    .trim()
    .required(),
});

const MessagesForm = () => {
  const channelId = useSelector((state) => state.channelsReducer.currentChannelId);
  const { username } = JSON.parse(localStorage.getItem('userId'));
  console.log('username', username);
  console.log('channelId', channelId);

  //   const [message, setMessage] = useState('');
  const inputRef = useRef();
  const { addMessage } = useSocket();

  useEffect(() => {
    inputRef.current.focus();
  });

  const formik = useFormik({
    initialValues: { body: '' },
    validationMessagesForm,
    onSubmit: (values) => {
      console.log('values', values);
      const { body } = values;
      const data = {
        body,
        channelId,
        username,
      };
      addMessage(data);
      formik.resetForm();
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <div className="mt-auto px-5 py-3">
      <Form onSubmit={formik.handleSubmit} className="py-1 border rounded-2">
        <InputGroup>
          <Form.Control
            name="body"
            className="border-0 p-0 ps-2"
            placeholder="Введите сообщение..."
            aria-label="Новое сообщение"
            value={formik.values.body}
            onChange={formik.handleChange}
            ref={inputRef}
            disabled={formik.isSubmitting}
          />
          <Button
            type='submit'
            variant='link'
            className='btn-group-vertical'
            disabled={formik.errors.body || !formik.values.body}
            >
          <ArrowRightSquare />
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};
export default MessagesForm;
