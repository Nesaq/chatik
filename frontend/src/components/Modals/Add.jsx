/* eslint-disable import/no-duplicates */
/* eslint-disable react/prop-types */
import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import * as yup from 'yup';
import { Modal, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { selectors as channelsSelectors } from '../../store/channelsSlice.js';
import { actions as channelsActions } from '../../store/channelsSlice.js';
import useSocket from '../../hooks/useSocket.js';
import { closeModal } from '../../store/modalsSlice.js';

const Add = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const { addChannel } = useSocket();

  const channels = useSelector(channelsSelectors.selectAll);

  const modalAddValidation = yup.object().shape({
    name: yup
      .string()
      .trim()
      .min(3, t('modals.modalConstraints'))
      .max(20, t('modals.modalConstraints'))
      .notOneOf(channels.map((channel) => channel.name), t('modals.mustBeUnique'))
      .required(t('modals.required')),
  });

  const responseCheck = (response) => {
    if (response.status === 'ok') {
      const { id } = response.data;
      console.log('EMMIT ID', id);
      dispatch(channelsActions.setCurrentChannelId(id));
      dispatch(closeModal());
    } else {
      console.log(`${response.status} bad connection`);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: modalAddValidation,
    onSubmit: (values) => {
      const { name } = values;
      addChannel({ name }, responseCheck);
    },
  });

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
        <Modal show centered>
          <Modal.Header closeButton onHide={() => dispatch(closeModal())}>
            <Modal.Title>Добавить канал</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group>
                <Form.Control
                  name='name'
                  id='name'
                  className='mb-2'
                  ref={inputRef}
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  isInvalid={formik.errors.name && formik.touched.name}
                  />
                  <Form.Label htmlFor='name' className='visually-hidden'>{t('modals.channelName')}</Form.Label>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.name}
                  </Form.Control.Feedback>
              </Form.Group>
              <div className='d-flex justify-content-end'>
                <Button variant='secondary' type='button' onClick={() => dispatch(closeModal())} className='me-2'>{t('modals.cancel')}</Button>
                <Button type='submit' variant='primary'>{t('modals.submit')}</Button>
              </div>
            </Form>
          </Modal.Body>
      </Modal>
  );
};

export default Add;
