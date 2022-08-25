import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { Button, Form, InputGroup } from 'react-bootstrap';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';
import useApi from '../../hooks/useApi.js';

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
  const { addMessage } = useApi();

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
      <Form
        className="py-1 border rounded-2"
        onSubmit={formik.handleSubmit}
      >
        <InputGroup>
          <Form.Control
            aria-label={t('messages.arialLabel')}
            className="border-0 p-0 ps-2"
            disabled={formik.isSubmitting}
            name="body"
            onChange={formik.handleChange}
            placeholder={t('messages.placeholder')}
            ref={inputRef}
            value={formik.values.body}
          />

          <Button
            className="btn-group-vertical"
            disabled={formik.errors.body || !formik.values.body}
            type="submit"
            variant="link"
          >
            <ArrowRightSquare />
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};
export default MessagesForm;
