import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { Button, Form, InputGroup } from 'react-bootstrap';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';
import useSocket from '../../hooks/useSocket';

const validationMessagesForm = yup.object().shape({
  body: yup
    .string()
    .trim()
    .required(),
});

const MessagesForm = () => {
  const { t } = useTranslation();

  const channelId = useSelector((state) => state.channelsReducer.currentChannelId);
  const { username } = JSON.parse(localStorage.getItem('user'));

  const inputRef = useRef(null);
  const { addMessage } = useSocket();

  const responseCheck = (response) => {
    if (response.status === 'ok') {
      console.log(t('messages.networkOkStatus'));
    } else {
      toast.error(t('networkError'), {
        position: 'top-right',
      });
    }
  };

  const formik = useFormik({
    initialValues: { body: '' },
    validationSchema: validationMessagesForm,
    onSubmit: (values) => {
      const { body } = values;
      const data = {
        body: filter.clean(body),
        channelId,
        username,
      };
      addMessage(data, responseCheck);
      formik.resetForm();
    },
  });

  useEffect(() => {
    inputRef.current?.focus();
  });

  return (
    <div className="mt-auto px-5 py-3">
      <Form onSubmit={formik.handleSubmit} className="py-1 border rounded-2">
        <InputGroup>
          <Form.Control
            name='body'
            className='border-0 p-0 ps-2'
            placeholder={t('messages.placeholder')}
            aria-label={t('messages.arialLabel')}
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
